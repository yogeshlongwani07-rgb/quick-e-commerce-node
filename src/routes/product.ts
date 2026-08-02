import express from "express";
const router = express.Router();
import ProductController from "../controllers/product-controller.js";
import { isLoggedIn, isAdmin } from "../middleware/auth.js";

router.post(
  "/create",
  isLoggedIn,
  isAdmin,
  ProductController.createProduct.bind(ProductController),
);
router.put(
  "/update/:id",
  isLoggedIn,
  isAdmin,
  ProductController.updateProduct.bind(ProductController),
);

export default router;
