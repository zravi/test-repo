const Joi = require('joi');

const studentCreateSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    class: Joi.string().required(),
    age: Joi.number().optional(),
    // profilePicture: Joi.any()
});

module.exports = studentCreateSchema;
