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
  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({
      success: true,
      message: "Logged out",
    });
  }
  async delete(req: Request, res: Response): Promise<void> {
    await UserServices.delete(req.user._id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res
      .status(200)
      .json({ message: "Account deleted Successfully", success: true });
  }
  async createAccessToken(req: Request, res: Response) {
    const user = await UserServices.createAccessToken(req.cookies.refreshToken);
    setAuthCookies(res, user, true);
    res
      .status(201)
      .json({ message: "Access Token create Successfully", success: true });
  }
}

export default new UserController();
