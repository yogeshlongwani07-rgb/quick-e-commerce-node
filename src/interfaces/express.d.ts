import "express";

interface TokenPayload {
  _id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

export {};
