import { Signup } from "../interfaces/user.js";
import userRepository from "../repositories/user-repository.js";

class UserServices {
  async create(body: Signup) {
    return userRepository.create(body);
  }
}

export default new UserServices();
