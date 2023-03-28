import express, { Request, Response } from "express";
import { dashboard, login } from "../controllers/main";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

export default router;
