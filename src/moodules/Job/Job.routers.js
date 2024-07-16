import { Router } from "express";
import { AddJob, ApplyToJob, DeleteJob, GetAllJob, GetJobsByCompany, GetJobsWithFilters, UpdateJob } from "./Job.controller.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { authorizeRole, } from "../../../middleware/OwnerAccount.js";
import { VerifyToken } from "../../../middleware/VerifyToken.js";
import { customerValdation, UploadFile } from "../../../middleware/uploadFile.js";
export const JobRouter = Router()
JobRouter.post('/AddJob', VerifyToken, authorizeRole('Company_HR'), asyncHandler(AddJob))
JobRouter.put('/UpdateJob/:id', VerifyToken, authorizeRole('Company_HR'), asyncHandler(UpdateJob))
JobRouter.delete('/DeleteJob/:id', VerifyToken, authorizeRole('Company_HR'), asyncHandler(DeleteJob))
JobRouter.get('/GetAllJob', VerifyToken, authorizeRole('Company_HR', 'User'), asyncHandler(GetAllJob))
JobRouter.get('/GetJobsByCompany', VerifyToken, authorizeRole('Company_HR', 'User'), asyncHandler(GetJobsByCompany))
JobRouter.get('/GetJobsWithFilters', VerifyToken, authorizeRole('Company_HR', 'User'), asyncHandler(GetJobsWithFilters))
JobRouter.post('/ApplyToJob', VerifyToken, authorizeRole('User'), UploadFile(customerValdation).single('userResume'), asyncHandler(ApplyToJob))
// JobRouter.get('/getapplication', VerifyToken, authorizeUser, asyncHandler(getapplication))
