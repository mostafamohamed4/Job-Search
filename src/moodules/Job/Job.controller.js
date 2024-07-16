import { Job } from "../../../database/models/Job.model.js"
import { Company } from "../../../database/models/Company.model.js"
import { Application } from "../../../database/models/Application.model.js"
import { AppError } from "../Units/AppError.js"
//AddJob
export const AddJob = async (req, res, next) => {
    const job = await Job.insertMany(req.body)
    res.status(200).json({ message: "Job created successfully", job })
}
//UpdateJob
export const UpdateJob = async (req, res, next) => {
    const JobId = req.params.id
    console.log(JobId);
    const job = await Job.findOneAndUpdate({ _id: JobId }, req.body, { new: true });
    if (!job) {
        return next(new AppError('Job not found', 404));
    }
    res.status(200).json({ message: "Job updated successfully", job });
}
//DeleteJob
export const DeleteJob = async (req, res, next) => {
    const JobId = req.params.id
    console.log(JobId);
    const job = await Job.findByIdAndDelete({ _id: JobId });
    if (!job) {
        return next(new AppError('Job not found', 404));
    }
    res.status(200).json({ message: "Job Delete successfully", job });
}
//Get all Jobs
export const GetAllJob = async (req, res, next) => {
    const jobs = await Job.find();
    if (!jobs) {
        return next(new AppError('Job not found', 404));
    }
    res.status(200).json({ message: "Job updated successfully", jobs });
}
//Get all Jobs for a specific company.
export const GetJobsByCompany = async (req, res, next) => {
    const { companyName } = req.query;
    const company = await Company.findOne({ companyName });
    if (!company) {
        return next(new AppError('Company not found', 404));
    }
    console.log(company._id);
    const jobs = await Job.find({ addedBy: company.companyHR });
    if (!jobs) {
        return next(new AppError('No jobs found for this company', 404));

    }
    res.status(200).json({ message: "Jobs retrieved successfully", company, jobs });
}
//Get all Jobs that match the following filters 
export const GetJobsWithFilters = async (req, res, next) => {
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filters = {};
    if (workingTime) {
        filters.workingTime = workingTime;
    }
    if (jobLocation) {
        filters.jobLocation = jobLocation;
    }
    if (seniorityLevel) {
        filters.seniorityLevel = seniorityLevel;
    }
    if (jobTitle) {
        filters.jobTitle = { $regex: new RegExp(jobTitle, "i") }; // Case-insensitive search
    }
    if (technicalSkills) {
        filters.technicalSkills = { $in: technicalSkills.split(",") }; // Assuming technicalSkills is an array field
    }
    const jobs = await Job.find(filters);
    if (!jobs.length) {
        return next(new AppError('No jobs found matching the filters', 404));
    }
    res.status(200).json({ message: "Jobs retrieved successfully", jobs });
}
//Apply to Job
export const ApplyToJob = async (req, res, next) => {
    req.body.userResume = req.file.filename
    console.log(req.body.userResume);
    const application = await Application.create(req.body);
    console.log(application);
    res.status(201).json({ message: 'Application submitted successfully' });

}
//getapplication
export const getapplication = async (req, res) => {
    const application = await Application.find()
    return res.json({ message: 'done', application })
}