import multer from "multer";
import { nanoid } from "nanoid";
export const customerValdation = {
    pdf: ['application/pdf']
}
export const UploadFile = (Valdation) => {
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            const modifiedFilename = file.originalname.replace(/\s+/g, '_');
            cb(null, nanoid(5) + '-' +modifiedFilename)
        }

    })
    const fileFilte = (req, file, cb) => {
        if (Valdation.incloud(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid format, only PDFs are allowed.'))
        }
    }
    const upload = multer({ storage, fileFilte })
    return upload
}