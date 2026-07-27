import { Request, Response } from "express";
import UserServices from "../services/user-services.js";
import generateToken from "../utils/generateToken.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    const user = await UserServices.create(req.body);
    const { accessToken, refreshToken } = await generateToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(200)
      .json({ message: "Account created Successfully", success: true });
  }
}

export default new UserController();
