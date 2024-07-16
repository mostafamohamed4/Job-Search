import { User } from "../../../database/models/User.model.js"
import bcrypt from "bcryptjs"
import { customAlphabet } from 'nanoid'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../Units/Email.js";
import { AppError } from "../Units/AppError.js";
//Sign Up 
export const AddUser = async (req, res, next) => {
    const user = await User.insertMany(req.body);
    res.status(201).json({ message: "User created successfully" })
}
//Sign In
export const LogIn = async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, password } = req.body
    const user = await User.findOne({
        $or: [
            { email: email },
            { mobileNumber: mobileNumber },
            { recoveryEmail: recoveryEmail }
        ]
    });
    if (user && bcrypt.compareSync(password, user.password)) {
        jwt.sign({ Userid: user._id, role: user.role, email: user.email, mobileNumber: user.mobileNumber, username: user.username }, "successfully",
            async (error, token) => {
                res.status(200).json({ message: "login..token", token })
                user.status = "online";
                await user.save();
            })
    } else {
        return next(new AppError("incorrect Email and password", 400))
    }
}
//update account.
export const UpdateUser = async (req, res, next) => {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { email: req.body.email, recoveryEmail: req.body.recoveryEmail, DOB: req.body.DOB, lastName: req.body.lastName, firstName: req.body.firstName, mobileNumber: req.body.mobileNumber }, { new: true });
    if (!user) {
        return next(new AppError("User not found", 404))
    }
    return res.status(200).json({ message: "User updated successfully", user })
}
//Delete account.
export const DeleteUser = async (req, res, next) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
        return next(new AppError("User not found", 404))
    }
    return res.status(200).json({ message: "User Delete successfully", user })
}

//Get user account data 
export const GetUser = async (req, res, next) => {
    const users = await User.findById(req.user.Userid);
    if (!users) {
        return next(new AppError("User not found", 404))
    }
    res.status(200).json({ message: "successfully", users })
}
//Get profile data for another user 
export const getProfileData = async (req, res, next) => {
    const userId = req.params.id || req.query.id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    res.status(200).json({ message: 'Profile data retrieved successfully', user });
}
//Update password
export const UpdatePassword = async (req, res, next) => {
    // const userId = req.user.Userid;
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    if (!bcrypt.compareSync(currentPassword, user.password)) {
        return next(new AppError('Current password is incorrect', 400));
    }
    user.password = bcrypt.hashSync(newPassword, 8);
    await User.updateOne({ _id: userId }, {
        $set: {
            password: user.password
        }
    }, { new: true });

    res.status(200).json({ message: 'Password updated successfully' });
}
//Forget password
export const requestPasswordReset = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const nanoid = customAlphabet('1234567890', 5);
    const resetPasswordOTP = nanoid();
    const resetPasswordExpires = Date.now() + 3600000; // OTP valid for 1 hour

    await User.updateOne(
        { _id: user._id },
        {
            resetPasswordOTP: resetPasswordOTP,
            resetPasswordExpires: resetPasswordExpires
        }
    );
    await sendEmail(user.email, `Your OTP is "${resetPasswordOTP}". It is valid for 1 hour.`);
    res.status(200).json({ message: 'OTP sent to your email' });


}
// the resetPassword
export const resetPassword = async (req, res, next) => {
    const { email, resetPasswordOTP, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError('User not found', 404));
    }
    const userWithOTP = await User.find({ email, resetPasswordOTP });
    if (!userWithOTP || userWithOTP.resetPasswordExpires < Date.now()) {
        return next(new AppError('Invalid or expired OTP', 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await User.updateOne(
        { _id: user._id },
        {
            $unset: {
                resetPasswordOTP: "",
                resetPasswordExpires: ""
            },
            $set: {
                password: hashedPassword
            }
        }, { new: true }
    );
    res.status(200).json({ message: 'Password has been reset successfully' });
}
//Get all accounts associated to a specific recovery Email 
export const getAllAccountsByRecoveryEmail = async (req, res, next) => {
    const { recoveryEmail } = req.params;
    const users = await User.find({ recoveryEmail });
    if (!users.length) {
        return next(new AppError('No accounts found for this recovery email', 404));
    }
    console.log(users);
    res.status(200).json({ message: "Successfully retrieved accounts", users });
}