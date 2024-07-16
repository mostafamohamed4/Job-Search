import jwt from 'jsonwebtoken'
import { AppError } from '../src/moodules/Units/AppError.js';

export const VerifyToken = async (req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return next(new AppError('Unauthorized: No token provided', 401));
    }
    jwt.verify(token, 'successfully', async (error, decoded) => {
        if (error) return next(new AppError("invalid token", 401))
        req.user = decoded
        next()
    })
}