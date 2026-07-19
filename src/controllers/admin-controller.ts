import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Signup } from "../interfaces/admin.js";
import { AppError } from "../utils/app-error.js";

class AdminTasks {
  async create(req: Request<{}, {}, Signup>, res: Response) {
    try {
      await AdminService.create(req.body);
      return res
        .status(201)
        .json({ message: "Account Created", success: true });
    } catch (err) {
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, success: false });
      }
      return res
        .status(500)
        .json({ message: "Unexpected Error", success: false, error: err });
    }
  }
}

export default new AdminTasks();
