import { Request, Response } from "express";
import UserServices from "../services/user-services.js";

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    await UserServices.create(req.body);
    res.status(200).json({ message: "Account created", success: true });
  }
}

export default new UserController();
