import axios from "axios";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import UserRepository from "../repositories/user-repository.js";
import { TokenPayload } from "../interfaces/base.js";
import { AppError } from "../utils/app-error.js";
import { GOOGLE_AUTH_PAGE, GOOGLE_CODE } from "../constant.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class oAuthService {
  async createUrl(state: string) {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      response_type: "code",
      scope: "openid email profile",
      state: state,
    });

    const url = GOOGLE_AUTH_PAGE + params.toString();
    return url;
  }

  async validateOrCreate(req: Request, res: Response): Promise<TokenPayload> {
    const { code, state } = req.query as {
      code: string;
      state: string;
    };

    if (!code) {
      throw new AppError("Authorization code missing", 400);
    }

    if (req.cookies.oauth_state !== state) {
      throw new AppError("Invalid state", 400);
    }

    res.clearCookie("oauth_state");

    const tokenResponse = await axios.post(
      GOOGLE_CODE,
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

    if (!id_token) {
      throw new AppError("Google did not return ID Token", 400);
    }

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new AppError("Invalid Google Token", 400);
    }

    if (!payload.email_verified) {
      throw new AppError("Email not verified", 400);
    }

    if (!payload.email) {
      throw new AppError("Google account has no email", 400);
    }
    let user = await UserRepository.findByEmail(payload.email!);

    if (!user) {
      user = await UserRepository.create({
        googleId: payload?.sub,
        name: payload?.name ?? "",
        email: payload?.email!,
      });
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      await user.save();
    }

    const objForToken = {
      _id: user._id.toString(),
      role: "user",
    };

    return objForToken;
  }
}

export default new oAuthService();
