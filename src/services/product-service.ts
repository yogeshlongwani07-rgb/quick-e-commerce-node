import ProductRepository from "../repositories/product-repository.js";
import { CreateProduct } from "../interfaces/product.js";

class ProductService {
  async createProduct(productData: CreateProduct): Promise<CreateProduct> {
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

    await ProductRepository.create({
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
