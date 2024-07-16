import { AppError } from "../src/moodules/Units/AppError.js";

export const CheckOwnership = async (req, res, next) => {
    const userId = req.user.Userid;
    const requestedUserId = req.params.id;
    if (userId !== requestedUserId) {
        return next(new AppError('Unauthorized: You are not authorized to update this account', 403));
    }
    next();
};


export const authorizeRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new AppError(`Unauthorized: Only ${roles.join(' or ')} can perform this action`, 403));
    }
    next();
};