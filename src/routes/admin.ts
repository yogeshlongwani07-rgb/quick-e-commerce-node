import express from "express";
const router = express.Router();
import AdminTasks from "../controllers/admin-controller.js";

router.post("/signup", AdminTasks.create);

export default router;
