import { Signup } from "../interfaces/user.js";
import UserRepository from "../repositories/user-repository.js";
import { AppError } from "../utils/app-error.js";

class UserServices {
  async create(body: Signup) {
    const { email } = body;
    const emailExist = await UserRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email Already Exist", 400);
    }
    return UserRepository.create(body);
  }
}

export default new UserServices();
