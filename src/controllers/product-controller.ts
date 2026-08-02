import { Request, Response } from "express";
import ProductService from "../services/product-service.js";
class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      await ProductService.createProduct(req.body);
      res
        .status(201)
        .json({ message: "Product created successfully", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating product", success: false });
    }
  }
}

export default new ProductController();
