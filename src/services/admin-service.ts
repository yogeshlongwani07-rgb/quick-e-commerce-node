import AdminRepository from "../repositories/admin-repository.js";
import { Signup } from "../interfaces/admin.js";
import { AppError } from "../utils/app-error.js";

class AdminServices {
  async create(body: Signup) {
    const { email } = body;
    const emailExist = await AdminRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email Already Exist", 400);
    }
    return AdminRepository.create(body);
  }
}

export default new AdminServices();
