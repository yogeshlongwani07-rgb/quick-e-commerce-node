import AdminRepository from "../repositories/admin-repository.js";
import { Login, Signup } from "../interfaces/admin.js";
import { AppError } from "../utils/app-error.js";
import bcrypt from "bcrypt";

class AdminService {
  async create(body: Signup) {
    const { email, name, password } = body;
    const emailExist = await AdminRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email Already Exist", 400);
    }
    const salt = parseInt(process.env.SALTROUND!, 10);
    if (!salt) {
      throw new AppError("SALT_ROUNDS not found", 400);
    }
    const hashpassword = await bcrypt.hash(password, salt);
    const newAccount = await AdminRepository.create({
      name,
      email,
      password: hashpassword,
    });
    return newAccount;
  }
  async login(body: Login) {
    const { email, password } = body;
    const admin = await AdminRepository.findByEmail(email);
    if (!admin) {
      throw new AppError("Admin not Found", 400);
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      throw new AppError("Invalid Credentials", 400);
    }
  }
}

export default new AdminService();
