import express, { Request, Response } from "express";
const router = express.Router();

router.get("/signup", (req: Request, res: Response) => {
  res.status(200).json({ message: "working" });
});

export default router;
