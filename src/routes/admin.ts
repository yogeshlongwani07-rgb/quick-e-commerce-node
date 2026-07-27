import express from "express";
const router = express.Router();
import {
  adminLoginSchema,
  AdminregisteSchema,
} from "../validations/admin.validation.js";
import { valdiate } from "../middleware/validate.js";
import AdminController from "../controllers/admin-controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

router.post(
  "/signup",
  valdiate(AdminregisteSchema),
  asyncHandler(AdminController.create.bind(AdminController)),
);

router.post(
  "/login",
  valdiate(adminLoginSchema),
  AdminController.login.bind(AdminController),
);

router.post("/logout", AdminController.logout.bind(AdminController));
router.delete(
  "/delete",
  isLoggedIn,
  AdminController.delete.bind(AdminController),
);

export default router;
