import AdminRepository from "../repositories/admin-repository.js";
import { Signup } from "../interfaces/admin.js";

class AdminServices {
  async create(body: Signup) {
    return await AdminRepository.create(body);
  }
}

export default new AdminServices();
