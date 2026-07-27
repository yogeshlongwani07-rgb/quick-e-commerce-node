import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces/base.js";

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.cookies?.accessToken;
  if (!token) {
    res.status(401).json({
      message: "Authentication is required to access this resource.",
      success: false,
    });
    return;
  }
  const decode = Jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
  ) as TokenPayload;

  req.user = decode;
  next();
}

export function isUser(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Authentication failed.", success: false });
    return;
  }
  if (req.user.role !== "user") {
    res.status(403).json({
      message: "Only admin can add/update/delete movie listings",
      success: false,
    });
    return;
  }
  next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Authentication failed.", success: false });
    return;
  }
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "Only admin can add/update/delete movie listings",
      success: false,
    });
    return;
  }

  next();
}
