import { User } from "../database/models/User.model.js"

import bcrypt from "bcryptjs"
import { AppError } from "../src/moodules/Units/AppError.js";
import { Company } from "../database/models/Company.model.js";
export const checkEmail = async (req, res, next) => {
    const userId = req.params.id
    const { email, mobileNumber, password, companyEmail } = req.body;
    //check Email
    const existingUserEmail = await User.findOne({ email: email })
    //check Mobile
    const existingUserWithMobile = await User.findOne({ mobileNumber: mobileNumber });

    if (existingUserEmail && existingUserEmail._id.toString() !== userId) {
        return next(new AppError("Email already exists", 409));
    }
    if (existingUserWithMobile && existingUserWithMobile._id.toString() !== userId) {
        return next(new AppError("Mobile number already exists", 409));

    }
    //check company email
    const existingCompany = await Company.findOne({ companyEmail });
    if (existingCompany) {
        return next(new AppError('Company email already exists', 409));
    }

    if (password) {
        req.body.password = bcrypt.hashSync(password, 8);
    }
    next()
}