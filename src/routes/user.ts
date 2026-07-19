import express from "express";
const router = express.Router();
import UserTasks from "../controllers/user-controller.js";
import { UserregisteSchema } from "../validations/user.validation.js";
import { valdiate } from "../middleware/validate.js";
router.get("/signup", valdiate(UserregisteSchema), UserTasks.create);

export default router;
