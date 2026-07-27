import express from "express";
const router = express.Router();
import {
  userLoginSchema,
  UserregisteSchema,
} from "../validations/user.validation.js";
import { valdiate } from "../middleware/validate.js";
import UserController from "../controllers/user-controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import userController from "../controllers/user-controller.js";
import { isLoggedIn, isUser } from "../middleware/auth.js";
router.post(
  "/signup",
  valdiate(UserregisteSchema),
  asyncHandler(UserController.create.bind(UserController)),
);

router.post(
  "/login",
  valdiate(userLoginSchema),
  UserController.login.bind(userController),
);

router.post(
  "/logout",
  isLoggedIn,
  isUser,
  UserController.logout.bind(UserController),
);
router.delete(
  "/delete",
  isLoggedIn,
  isUser,
  UserController.delete.bind(UserController),
);

export default router;
