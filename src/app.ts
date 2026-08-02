import express from "express";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/product.js";

export default function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/product", productRoutes);
  app.use(errorHandler);

  return app;
}
