import express from "express";
const router = express.Router();
import UserTasks from "../controllers/user-controller.js";
router.get("/signup", UserTasks.create);

export default router;
