export const validate = (Schema) => {
    return (req, res, next) => {
        let { error } = Schema.validate({ ...req.body, ...req.params }, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMesg = error.details.map(err => err.message)
            res.json(errMesg)
        }
    }
}

