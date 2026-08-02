import Product from "../models/product.js";
import BaseRepository from "./base-repository.js";
import { CreateProduct } from "../interfaces/product.js";
class ProductRepository extends BaseRepository<CreateProduct> {
  constructor() {
    super(Product);
  }
  async deleteMany(filter: { createdBy: string }) {
    return this.model.deleteMany(filter);
  }
}

export default new ProductRepository();
