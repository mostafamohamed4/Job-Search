import { Application } from "../../../database/models/Application.model.js"
import { Company } from "../../../database/models/Company.model.js"
import { Job } from "../../../database/models/Job.model.js"
import { AppError } from "../Units/AppError.js"
//Add company
export const AddCompany = async (req, res, next) => {
    const company = await Company.insertMany(req.body)

    res.status(200).json({ message: "Company created successfully" })
}
//Update company data
export const UpdateCompany = async (req, res, next) => {
    const companyId = req.params.id
    const updateData = req.body
    if (!updateData || Object.keys(updateData).length === 0) {
        return next(new AppError('No data provided for update', 400));
    } const company = await Company.findOneAndUpdate({ _id: companyId }, { $set: updateData }, { new: true });
    if (!company) {
        return next(new AppError('Company not found', 404));
    }
    res.status(200).json({ message: "Company updated successfully", company });
}
//Delete company data

export const DeleteCompany = async (req, res, next) => {
    const companyId = req.params.id
    const company = await Company.findOneAndDelete({ _id: companyId });
    if (!company) {
        return next(new AppError('Company not found', 404));
    }
    res.status(200).json({ message: "Company deleted successfully" })
}
//Get companies
export const Getcompany = async (req, res, next) => {
    const companyId = req.params.id
    const company = await Company.findById({ _id: companyId });
    if (!company) {
        return next(new AppError('Company not found', 404));
    }
    res.status(200).json({ message: " Get Company successfully", company })

}
//Get company data 
export const GetCompanyData = async (req, res, next) => {
    const { companyId } = req.params;
    const company = await Company.findById({ _id: companyId });
    if (!company) {
        return next(new AppError('Company not found', 404));
    }

    const jobs = await Job.find({ addedBy: company.companyHR });
    console.log(jobs);
    res.status(200).json({ message: " Get Company successfully", company, jobs })
}
//Search for a company with a name. 
export const searchCompanyByName = async (req, res, next) => {
    const { name } = req.query;
    console.log(req.query);
    const companies = await Company.find({ companyName: { $regex: name, $options: 'i' } });
    if (companies.length === 0) {
        return next(new AppError('No companies found with the given name', 404));
    }

    res.status(200).json({ message: "Companies retrieved successfully", companies });
}
//Get all applications for specific Job
export const GetAllApplications = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await Job.find({ _id: jobId });
    console.log(job);
    if (!job) {
        return next(new AppError('Job not found', 404));
    }
    const applications = await Application.find({ jobId }).populate('userId', 'firstName lastName email username');
    res.status(200).json({ message: "Applications retrieved successfully", applications });

}
