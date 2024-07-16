import Joi from "joi";

export const signupValidationSchema = Joi.object({
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    username: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6),
    recoveryEmail: Joi.string().email().optional().trim(),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string().required().trim(),
    role: Joi.string().valid('User', 'Company_HR').default('User'),
    status: Joi.string().valid('online', 'offline').default('offline')
});

