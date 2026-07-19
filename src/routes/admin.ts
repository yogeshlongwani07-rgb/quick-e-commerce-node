import express from "express";
const router = express.Router();
import AdminTasks from "../controllers/admin-controller.js";
import { AdminregisteSchema } from "../validations/admin.validation.js";
import { valdiate } from "../middleware/validate.js";

router.post("/signup", valdiate(AdminregisteSchema), AdminTasks.create);

export default router;
