import express from "express";
const router = express.Router();
import { UserregisteSchema } from "../validations/user.validation.js";
import { valdiate } from "../middleware/validate.js";
import UserController from "../controllers/user-controller.js";
import asyncHandler from "../utils/asyncHandler.js";
router.post(
  "/signup",
  valdiate(UserregisteSchema),
  asyncHandler(UserController.create.bind(UserController)),
);
export default router;
