import { Signup, Login, TokenPayload } from "../interfaces/base.js";
import UserRepository from "../repositories/user-repository.js";
import { AppError } from "../utils/app-error.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

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
  async delete(id: string) {
    if (!id) {
      throw new AppError("Please login first", 400);
    }
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppError("Account not found", 400);
    }
    await UserRepository.delete(id);
  }

  async createAccessToken(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Not Token Found", 404);
    }

    const decode = Jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as TokenPayload;

    const user = await UserRepository.findById(decode._id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const { accessToken } = generateToken(user);
    return accessToken;
  }
}

export default new UserServices();
