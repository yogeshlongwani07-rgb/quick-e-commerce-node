import express from "express";
const router = express.Router();
import ProductController from "../controllers/product-controller.js";

router.post("/create", ProductController.createProduct.bind(ProductController));

export default router;
