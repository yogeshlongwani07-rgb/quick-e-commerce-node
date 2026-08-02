import { Request, Response } from "express";
import ProductService from "../services/product-service.js";
class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    await ProductService.createProduct(req.body, req.user._id);
    res
      .status(201)
      .json({ message: "Product created successfully", success: true });
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    const productId = req.params.id as string;
    await ProductService.updateProduct(productId, req.body, req.user._id);
    res
      .status(200)
      .json({ message: "Product updated successfully", success: true });
  }
}

export default new ProductController();
