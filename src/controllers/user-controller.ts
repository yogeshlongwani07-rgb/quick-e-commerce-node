import { Request, Response } from "express";
import UserServices from "../services/user-services.js";
import generateToken from "../utils/generateToken.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import { Login, Signup } from "../interfaces/base.js";

class UserController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    const user = await UserServices.create(req.body);
    const { accessToken, refreshToken } = await generateToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(200)
      .json({ message: "Account created Successfully", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    const admin = await UserServices.login(req.body);
    const { accessToken, refreshToken } = await generateToken(admin);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
}

export default new UserController();
