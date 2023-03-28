import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import CustomError from "../class/ErrorClass";
import {
  IJwtPayload,
  IToken,
  RequestWithUser,
} from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";
dotenv.config();
const login = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      throw new CustomError("Please provide both and password", 404);
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, "jwtSecret", {
      expiresIn: "30d",
    });
    res
      .status(200)
      .json({ msg: "USER CREATED", token, username: `Hello, ${username}` });
  }
);
const dashboard = asyncMiddleware(
  async (req: any, res: Response, next: NextFunction) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${req.user?.username}`,
      secret: `Here is your lucky number : ${luckyNumber}`,
    });
  }
);
export { dashboard, login };
