import { Request, Response } from "express";
import crypto from "crypto";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import oAuthService from "../services/oAuth-service.js";

class OAuthController {
  async redirectToProvider(req: Request, res: Response) {
    const state = crypto.randomBytes(32).toString("hex");

    res.cookie("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    const url = await oAuthService.createUrl(state);
    res.redirect(url);
  }

  async createFromProvider(req: Request, res: Response): Promise<void> {
    const objForToken = await oAuthService.validateOrCreate(req, res);
    setAuthCookies(res, objForToken);
    res.status(201).json({ message: "Done with oAuth" });
  }
}

export default new OAuthController();
