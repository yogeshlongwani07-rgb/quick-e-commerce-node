import Admin from "../models/admin.js";
import BaseRepository from "./base-repository.js";
import { Signup } from "../interfaces/base.js";

class AdminRepository extends BaseRepository<Signup> {
  constructor() {
    super(Admin);
  }
  async addProductToAdmin(adminId: string, productId: string): Promise<void> {
    await Admin.findByIdAndUpdate(adminId, {
      $push: { products: productId },
    });
  }
}

export default new AdminRepository();
