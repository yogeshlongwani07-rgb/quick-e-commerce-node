import express, { Request, Response } from "express";
import crypto from "crypto";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();
const states = new Set();

router.get("/google", (req: Request, res: Response) => {
  const state = crypto.randomBytes(32).toString("hex");

  states.add(state);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "openid email profile",
    state: state,
  });

  const url =
    "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString();
  res.redirect(url);
});

router.get(
  "/google/callback",
  async (req: Request, res: Response): Promise<void> => {
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

    if (!state || !states.has(state)) {
      res.status(400).json({
        message: "Invalid state",
      });
      return;
    }
    states.delete(state);

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

    const { accessToken, refreshToken } = generateToken({
      _id: user._id.toString(),
      role: "user",
    });

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

    res.status(201).json({ message: "Done with oAuth" });
  },
);

export default router;
