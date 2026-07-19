import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Signup } from "../interfaces/admin.js";

class AdminController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    await AdminService.create(req.body);
    res.status(201).json({ message: "Account Created", success: true });
  }
}

export default new AdminController();
