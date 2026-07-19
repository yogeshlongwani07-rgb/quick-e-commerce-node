import express from "express";
const router = express.Router();
import { AdminregisteSchema } from "../validations/admin.validation.js";
import { valdiate } from "../middleware/validate.js";
import AdminController from "../controllers/admin-controller.js";
import asyncHandler from "../utils/asyncHandler.js";

router.post(
  "/signup",
  valdiate(AdminregisteSchema),
  asyncHandler(AdminController.create.bind(AdminController)),
);

export default router;
