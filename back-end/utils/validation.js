const Joi = require("joi");

// Define messages for English and Vietnamese
const messages = {
  en: {
    "string.base": "Must be a string.",
    "string.empty": "Cannot be empty.",
    "string.min": "Must be at least {#limit} characters.",
    "string.max": "Cannot exceed {#limit} characters.",
    "any.required": "This field is required.",
    "string.pattern.base": "Password must be 6-15 characters, containing only letters and numbers.",
    "string.pattern.phone": "Phone number must be between 10-15 digits."
  },
  vi: {
    "string.base": "Phải là chuỗi ký tự.",
    "string.empty": "Không được để trống.",
    "string.min": "Phải có ít nhất {#limit} ký tự.",
    "string.max": "Không được vượt quá {#limit} ký tự.",
    "any.required": "Trường này là bắt buộc.",
    "string.pattern.base": "Mật khẩu chỉ chứa chữ và số, từ 6-15 ký tự.",
    "string.pattern.phone": "Số điện thoại phải có từ 10-15 chữ số."
  }
};

// Login Validation Schema
const loginValidation = (data, lang = "en") => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages(messages[lang]),
    password: Joi.string()
      .min(6)
      .max(15)
      .pattern(new RegExp("^[A-Za-z0-9]{6,15}$"))
      .required()
      .messages(messages[lang]),
  });

  return schema.validate(data, { abortEarly: false });
};

// Registration Validation Schema
const registerValidation = (data, lang = "en") => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages(messages[lang]),
    phone: Joi.string()
      .pattern(new RegExp("^[0-9]{10,15}$"))
      .required()
      .messages({
        ...messages[lang],
        "string.pattern.base": messages[lang]["string.pattern.phone"]
      }),
    password: Joi.string()
      .min(6)
      .max(15)
      .pattern(new RegExp("^[A-Za-z0-9]{6,15}$"))
      .required()
      .messages(messages[lang]),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { loginValidation, registerValidation };
