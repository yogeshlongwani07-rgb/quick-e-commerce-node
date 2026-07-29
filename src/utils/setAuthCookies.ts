import { Response } from "express";
import generateToken from "./generateToken.js";

interface TokenPayload {
  _id: string;
  role: string;
}

export async function setAuthCookies(res: Response, obj: TokenPayload) {
  const { accessToken, refreshToken } = generateToken(obj);

  const isProd = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProd ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
