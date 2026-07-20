import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Login, Signup } from "../interfaces/admin.js";

class AdminController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    await AdminService.create(req.body);
    res.status(201).json({ message: "Account Created", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    await AdminService.login(req.body);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
}

export default new AdminController();
