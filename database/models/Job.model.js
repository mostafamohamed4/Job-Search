import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },

    jobLocation: {
        type: String,
        enum: ['onsite', 'remotely', 'hybrid'],
        required: true,
    },
    workingTime: {
        type: String,
        enum: ['part-time', 'full-time'],
        required: true,

    },
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required: true,

    },
    jobDescription: {
        type: String,
        required: true,
        trim: true
    },
    technicalSkills: {
        type: [String],
        required: true
    },
    softSkills: {
        type: [String],
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})
export const Job = mongoose.model('Job', JobSchema);
