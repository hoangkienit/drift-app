const Joi = require("joi");

// Login Validation Schema
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .min(6)
      .max(15)
      .pattern(new RegExp("^[A-Za-z0-9]{6,15}$"))
      .required(),
  });

  return schema.validate(data);
};

// Registration Validation Schema
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .pattern(new RegExp("^[0-9]{10,15}$"))
      .required(),
    password: Joi.string()
      .min(6)
      .max(15)
      .pattern(new RegExp("^[A-Za-z0-9]{6,15}$"))
      .required(),
  });

  return schema.validate(data);
};

module.exports = { loginValidation, registerValidation };
