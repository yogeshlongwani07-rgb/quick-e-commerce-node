import Product from "../models/product.js";
import BaseRepository from "./base-repository.js";
import { CreateProduct } from "../interfaces/product.js";
class ProductRepository extends BaseRepository<CreateProduct> {
  constructor() {
    super(Product);
  }
}

export default new ProductRepository();
