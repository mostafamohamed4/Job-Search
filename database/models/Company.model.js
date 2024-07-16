import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    description: {
        type: String,
        trim: true,
    },
    industry: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    numberOfEmployees: {
        type: String,
        required: true,
        min: 11,
        max: 20
    },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    companyHR: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
})
export const Company = mongoose.model('Company', CompanySchema);
