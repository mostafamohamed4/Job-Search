import Joi from "joi";

export const companyValidationSchema = Joi.object({
    companyName: Joi.string().required().trim(),
    description: Joi.string().optional().trim(),
    industry: Joi.string().optional().trim(),
    address: Joi.string().optional().trim(),
    numberOfEmployees: Joi.string().required(),
    companyEmail: Joi.string().email().required().trim(),
    companyHR: Joi.string().required()
});