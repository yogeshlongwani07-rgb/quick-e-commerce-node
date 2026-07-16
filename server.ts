import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();
import adminRoutes from "./src/controllers/admin-controller.js";
import userRoutes from "./src/controllers/user-controller.js";

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Working - Good Health", success: true });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Connected ${process.env.PORT}`);
});
