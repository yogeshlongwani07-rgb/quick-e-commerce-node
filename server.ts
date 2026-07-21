import dotenv from "dotenv";
import express from "express";
import { envVar } from "./src/constant.js";

dotenv.config();

for (let varName of envVar) {
  if (!process.env[varName]) {
    throw new Error(`${varName} not found`);
  }
}

const app = express();
import adminRoutes from "./src/routes/admin.js";
import userRoutes from "./src/routes/user.js";
import connectToDB from "./src/config/mongo.js";
import errorHandler from "./src/middleware/errorHandler.js";
connectToDB();

app.use(express.json());
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server Connected ${process.env.PORT}`);
});
