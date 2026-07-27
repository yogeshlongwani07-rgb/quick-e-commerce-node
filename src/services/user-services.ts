import { Signup, Login } from "../interfaces/user.js";
import UserRepository from "../repositories/user-repository.js";
import { AppError } from "../utils/app-error.js";
import bcrypt from "bcrypt";

class UserServices {
  async create(body: Signup) {
    const { name, email, password } = body;
    const emailExist = await UserRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email Already Exist", 400);
    }
    const salt = parseInt(process.env.SALTROUND!, 10);
    if (!salt) {
      throw new AppError("SALT_ROUNDS not found", 400);
    }
    const hashpassword = await bcrypt.hash(password, salt);
    return UserRepository.create({ name, email, password: hashpassword });
  }

  async login(body: Login) {
    const { email, password } = body;
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not Found", 400);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AppError("Invalid Credentials", 400);
    }
    return user;
  }
}

export default new UserServices();
