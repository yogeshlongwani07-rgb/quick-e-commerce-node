import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Login, Signup } from "../interfaces/admin.js";
import generateToken from "../utils/generateToken.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";

class AdminController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    const admin = await AdminService.create(req.body);
    const { accessToken, refreshToken } = await generateToken(admin);
    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(201)
      .json({ message: "Account Created Successfully", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    await AdminService.login(req.body);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
}

export default new AdminController();
