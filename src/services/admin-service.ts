import AdminRepository from "../repositories/admin-repository.js";
import { Login, Signup } from "../interfaces/admin.js";
import { AppError } from "../utils/app-error.js";

class AdminService {
  async create(body: Signup) {
    const { email, name, password } = body;
    const emailExist = await AdminRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email Already Exist", 400);
    }
    return AdminRepository.create({ name, email, password });
  }
  async login(body: Login) {}
}

export default new AdminService();
