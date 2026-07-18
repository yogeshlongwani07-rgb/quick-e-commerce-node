import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.status(200).json({ message: "working" });
});

export default router;
