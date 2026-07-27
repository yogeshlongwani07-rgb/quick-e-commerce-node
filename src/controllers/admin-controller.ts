import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Login, Signup } from "../interfaces/base.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";

class AdminController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    const admin = await AdminService.create(req.body);
    setAuthCookies(res, admin);
    res
      .status(201)
      .json({ message: "Account Created Successfully", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    const admin = await AdminService.login(req.body);
    setAuthCookies(res, admin);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
}

export default new AdminController();
