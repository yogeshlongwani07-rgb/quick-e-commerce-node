import { Request, Response } from "express";
import crypto from "crypto";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import User from "../models/user.js";
import oAuthService from "../services/oAuth-service.js";
import { valdiate } from "../middleware/validate.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    const { code, state } = req.query as {
      code: string;
      state: string;
    };

    if (!code) {
      res.status(400).json({
        message: "Authorization code missing",
      });
      return;
    }

    if (req.cookies.oauth_state !== state) {
      res.status(400).json({
        message: "Invalid state",
      });
      return;
    }

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    const { id_token } = tokenResponse.data;

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket);
    const payload = ticket.getPayload();

    if (!payload) {
      res.status(401).json({
        message: "Invalid Google Token",
      });
      return;
    }

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      console.log("New Google account");
      user = await User.create({
        googleId: payload?.sub,
        name: payload?.name,
        email: payload?.email,
      });
    }

    const objForToken = {
      _id: user._id.toString(),
      role: "user",
    };

    setAuthCookies(res, objForToken);
    res.status(201).json({ message: "Done with oAuth" });
  }
}

export default new OAuthController();
