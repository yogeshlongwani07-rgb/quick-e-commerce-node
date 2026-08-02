import ProductRepository from "../repositories/product-repository.js";
import { CreateProduct } from "../interfaces/product.js";
import { AppError } from "../utils/app-error.js";
import AdminRepository from "../repositories/admin-repository.js";

class ProductService {
  async createProduct(
    productData: CreateProduct,
    createdBy: string,
  ): Promise<void> {
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

    const product = await ProductRepository.create({
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
    await AdminRepository.addProductToAdmin(createdBy, product._id);
  }
  async updateProduct(
    productId: string,
    productData: Partial<CreateProduct>,
    AdminId: string,
  ): Promise<void> {
    const existingProduct = await ProductRepository.findById(productId);
    if (!existingProduct) {
      throw new AppError("Product not found", 404);
    }
    const { createdBy } = existingProduct;
    if (createdBy.toString() !== AdminId) {
      throw new AppError("You are not authorized to update this product", 403);
    }
    await ProductRepository.update(productId, productData);
  }
}

export default new ProductService();
