import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";

interface Signup {
  name: string;
  email: string;
  password: string;
}

class AdminTasks {
  async create(req: Request<{}, {}, Signup>, res: Response) {
    await AdminService.create(req.body);
    res.status(200).json({ message: "Account Created", success: true });
  }
}

export default new AdminTasks();
