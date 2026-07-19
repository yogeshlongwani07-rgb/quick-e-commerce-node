import Joi from "joi";

export const AdminregisteSchema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
});
