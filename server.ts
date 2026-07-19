import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();
import adminRoutes from "./src/routes/admin.js";
import userRoutes from "./src/routes/user.js";
import connectToDB from "./src/config/mongo.js";
connectToDB();

app.use(express.json());
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server Connected ${process.env.PORT}`);
});
