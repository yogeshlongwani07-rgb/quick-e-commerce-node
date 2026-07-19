import { Request, Response } from "express";
import UserServices from "../services/user-services.js";
import { AppError } from "../utils/app-error.js";

class UserController {
  async create(req: Request, res: Response) {
    try {
      await UserServices.create(req.body);
      return res
        .status(200)
        .json({ message: "Account created", success: true });
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

export default new UserController();
