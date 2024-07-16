import { Router } from "express";
import { AddUser, DeleteUser, getAllAccountsByRecoveryEmail, getProfileData, GetUser, LogIn, requestPasswordReset, resetPassword, UpdatePassword, UpdateUser } from "./Users.controller.js";
import { checkEmail } from "../../../middleware/checkEmail.js";
import jwt from 'jsonwebtoken'
import { User } from "../../../database/models/User.model.js"
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { VerifyToken } from "../../../middleware/VerifyToken.js";
import { CheckOwnership } from "../../../middleware/OwnerAccount.js";
import { validate } from "../../../middleware/validate.js";
import { signupValidationSchema } from "./User.validation.js";

export const UserRouter = Router()
UserRouter.post('/AddUser',validate(signupValidationSchema) ,checkEmail, asyncHandler(AddUser))
UserRouter.post('/LogIn', asyncHandler(LogIn))
UserRouter.put('/:id', VerifyToken, CheckOwnership, checkEmail, asyncHandler(UpdateUser))
UserRouter.delete('/:id', VerifyToken, CheckOwnership, asyncHandler(DeleteUser))
UserRouter.get('/GetUser', VerifyToken, CheckOwnership, asyncHandler(GetUser))
UserRouter.get('/getProfileData/:id', asyncHandler(getProfileData))
UserRouter.put('/UpdatePassword/:id', asyncHandler(UpdatePassword))
UserRouter.post('/requestPasswordReset', asyncHandler(requestPasswordReset))
UserRouter.post('/resetPassword', asyncHandler(resetPassword))
UserRouter.get('/getAllAccountsByRecoveryEmail/:recoveryEmail', asyncHandler(getAllAccountsByRecoveryEmail))




UserRouter.get('/verify/:token', async (req, res) => {
    jwt.verify(req.params.token, 'checkEmail', async (errorr, playoad) => {
        if (errorr) { res.status(404).json({ message: errorr }) }
        const user = await User.findOneAndUpdate({ email: playoad.email }, { confirmEmail: true });
        res.status(200).json({ message: "successfully", email: playoad.email })
    })
})