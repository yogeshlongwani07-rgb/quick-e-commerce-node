import express from "express";
const router = express.Router();
import {
  adminLoginSchema,
  AdminregisteSchema,
} from "../validations/admin.validation.js";
import { valdiate } from "../middleware/validate.js";
import AdminController from "../controllers/admin-controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { isAdmin, isLoggedIn } from "../middleware/auth.js";

router.post(
  "/signup",
  valdiate(AdminregisteSchema),
  asyncHandler(AdminController.create.bind(AdminController)),
);

router.post(
  "/login",
  valdiate(adminLoginSchema),
  asyncHandler(AdminController.login.bind(AdminController)),
);

router.post(
  "/logout",
  isLoggedIn,
  isAdmin,
  asyncHandler(AdminController.logout.bind(AdminController)),
);
router.delete(
  "/delete",
  isLoggedIn,
  isAdmin,
  asyncHandler(AdminController.delete.bind(AdminController)),
);

router.post(
  "/token/refresh",
  AdminController.createAccessToken.bind(AdminController),
);
export default router;
