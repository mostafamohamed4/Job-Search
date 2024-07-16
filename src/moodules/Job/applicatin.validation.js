import Joi from "joi";

export const applicationValidationSchema = Joi.object({
    jobId: Joi.string().required(),
    userId: Joi.string().required(),
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.string()
});