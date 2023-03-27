import express, { Request, Response } from "express";
import { dashboard, login } from "../controllers/main";

const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(dashboard);

export default router;
