import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Signup } from "../interfaces/admin.js";

class AdminTasks {
  async create(req: Request<{}, {}, Signup>, res: Response) {
    await AdminService.create(req.body);
    res.status(200).json({ message: "Account Created", success: true });
  }
}

export default new AdminTasks();
