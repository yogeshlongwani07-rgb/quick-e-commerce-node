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
