import { AppError } from "./AppError.js"

export const pageError = (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`,404))
}