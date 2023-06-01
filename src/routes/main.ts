import express from "express";
import { dashboard, login } from "../controllers/main";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";

const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

export default router;
