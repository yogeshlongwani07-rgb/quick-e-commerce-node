import express from "express";
const router = express.Router();
import ProductController from "../controllers/product-controller.js";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";
import asyncHandler from "../utils/asyncHandler.js";

router.post(
  "/create",
  isLoggedIn,
  isAdmin,
  asyncHandler(ProductController.createProduct.bind(ProductController)),
);
router.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  asyncHandler(ProductController.updateProduct.bind(ProductController)),
);

export default router;
