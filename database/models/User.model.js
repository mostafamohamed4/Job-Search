import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        required: true

    },
    recoveryEmail: {
        type: String,
        trim: true
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
}, {
    timestamps: true, versionKey: false
})
export const User = mongoose.model('User', UserSchema);

