import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Working - Good Health", success: true });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected ${process.env.PORT}`);
});
