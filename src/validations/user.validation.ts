import Joi from "joi";

export const UserregisteSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().trim().required().email(),
  password: Joi.string().min(6).required(),
});
