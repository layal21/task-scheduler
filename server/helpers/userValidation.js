const Joi = require('joi');

const emailSchema = Joi.string().email().required();
const usernameSchema = Joi.string().min(3).max(30).required();
const passwordSchema = Joi.string().min(8).required()

module.exports = {
    emailSchema,
    usernameSchema,
    passwordSchema
}