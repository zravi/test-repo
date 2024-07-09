const Joi = require('joi');

const profileCreateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profilePicture: Joi.any()
});

module.exports = profileCreateSchema;
