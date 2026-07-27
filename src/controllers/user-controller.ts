import { Request, Response } from "express";
import UserServices from "../services/user-services.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import { Login, Signup } from "../interfaces/base.js";

class UserController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    const user = await UserServices.create(req.body);
    setAuthCookies(res, user);
    res
      .status(200)
      .json({ message: "Account created Successfully", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    const user = await UserServices.login(req.body);
    setAuthCookies(res, user);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
  async logout(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
      success: true,
      message: "Logged out",
    });
  }
}

export default new UserController();
