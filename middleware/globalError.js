import { AppError } from "../src/moodules/Units/AppError.js"

export const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    return res.status(err.statusCode).json({ message: err.message, code: err.statusCode })

}
