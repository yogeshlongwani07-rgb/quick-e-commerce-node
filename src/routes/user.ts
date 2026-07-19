import express from "express";
const router = express.Router();
import { UserregisteSchema } from "../validations/user.validation.js";
import { valdiate } from "../middleware/validate.js";
import UserController from "../controllers/user-controller.js";
router.get("/signup", valdiate(UserregisteSchema), UserController.create);

export default router;
