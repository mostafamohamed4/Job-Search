import { Router } from "express";
import { AddCompany, DeleteCompany, GetAllApplications, Getcompany, GetCompanyData, searchCompanyByName, UpdateCompany } from "./Company.controller.js";
// import { checkRoleCompanyHR } from "../../../middleware/OwnerAccount.js";
import { asyncHandler } from "../../../middleware/asyncHandler.js";
import { VerifyToken } from "../../../middleware/VerifyToken.js";
import { checkEmail } from "../../../middleware/checkEmail.js";
import { authorizeRole } from "../../../middleware/OwnerAccount.js";

export const CompanyRouter = Router()
CompanyRouter.post('/AddCompany', checkEmail, VerifyToken, authorizeRole('Company_HR'), asyncHandler(AddCompany))
CompanyRouter.put('/UpdateCompany/:id', VerifyToken, authorizeRole('Company_HR'), asyncHandler(UpdateCompany))
CompanyRouter.delete('/DeleteCompany/:id', VerifyToken, authorizeRole('Company_HR'), asyncHandler(DeleteCompany))
CompanyRouter.get('/Getcompany/:id', VerifyToken, authorizeRole('Company_HR'), asyncHandler(Getcompany))
CompanyRouter.get('/GetCompanyData/:companyId', VerifyToken, authorizeRole('Company_HR'), asyncHandler(GetCompanyData));
CompanyRouter.get('/searchCompanyByName', VerifyToken, authorizeRole('Company_HR', 'User'), asyncHandler(searchCompanyByName))
CompanyRouter.get('/GetAllApplications/:jobId', VerifyToken, authorizeRole('Company_HR'), asyncHandler(GetAllApplications))     