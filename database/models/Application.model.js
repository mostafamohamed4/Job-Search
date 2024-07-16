import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTechSkills: {
        type: [String],
        required: true

    },
    userSoftSkills: {
        type: [String],
        required: true

    },
    userResume: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
ApplicationSchema.post('init', (doc) => {
    doc.userResume = 'http://localhost:3000/uploads/' + doc.userResume
})
export const Application = mongoose.model('Application', ApplicationSchema);