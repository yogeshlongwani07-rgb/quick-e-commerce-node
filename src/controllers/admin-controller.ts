import { Request, Response } from "express";
import AdminService from "../services/admin-service.js";
import { Login, Signup } from "../interfaces/admin.js";
import generateToken from "../utils/generateToken.js";

class AdminController {
  async create(req: Request<{}, {}, Signup>, res: Response): Promise<void> {
    const admin = await AdminService.create(req.body);
    const { accessToken, refreshToken } = await generateToken(admin);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Account Created", success: true });
  }
  async login(req: Request<{}, {}, Login>, res: Response): Promise<void> {
    await AdminService.login(req.body);
    res.status(200).json({ message: "You are Logged in", success: true });
  }
}

export default new AdminController();
