import ProductRepository from "../repositories/product-repository.js";
import { CreateProduct } from "../interfaces/product.js";

class ProductService {
  async createProduct(
    productData: CreateProduct,
    createdBy: string,
  ): Promise<CreateProduct> {
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
      createdBy,
    });
    return productData;
  }
  async updateProduct(
    productId: string,
    productData: Partial<CreateProduct>,
  ): Promise<void> {
    await ProductRepository.update(productId, productData);
  }
}

export default new ProductService();
