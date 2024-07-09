const Joi = require('joi');

const profileCreateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().optional(),
    // profilePicture: Joi.any()
});

module.exports = profileCreateSchema;
