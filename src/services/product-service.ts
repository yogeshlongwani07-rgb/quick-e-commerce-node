import { Product } from "../interfaces/product.js";

class ProductService {
  async createProduct(productData: Product): Promise<Product> {
    const {
      name,
      description,
      price,
      brand,
      category,
      unit,
      stock,
      isAvailable,
    } = productData;

    console.log("Product Data:", {
      name,
      description,
      price,
      brand,
      category,
      unit,
      stock,
      isAvailable,
    });
    return productData;
  }
}

export default new ProductService();
