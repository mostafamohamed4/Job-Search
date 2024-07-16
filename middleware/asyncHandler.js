export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return res.status(500).json({
                Message: "Internal Server Error",
                error: error.message,
                statusCode: 500
            })

        })
    }

}