import express from "express";
import oAuthController from "../controllers/oAuth-controller.js";

const router = express.Router();

router.get("/google", oAuthController.redirectToProvider.bind(oAuthController));

router.get(
  "/google/callback",
  oAuthController.createFromProvider.bind(oAuthController),
);

export default router;
