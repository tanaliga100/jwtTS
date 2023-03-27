import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import CustomError from "../class/ErrorClass";
import { IJwtPayload, IToken } from "../interfaces/all.interfaces";
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
const dashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new CustomError("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "jwtSecret") as IJwtPayload;
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your lucky number : ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
};
export { dashboard, login };

//  const { username, password } = req.body;
//  console.log(req.body);
//  try {
//    if (!username || !password) {
//      throw new CustomError("Please provide both and password", 404);
//    }
//    const id = new Date().getDate();
//    const token = jwt.sign({ id, username }, "jwtSecret", {
//      expiresIn: "30d",
//    });

//    res
//      .status(200)
//      .json({ msg: "USER CREATED", token, username: `Hello, ${username}` });
//  } catch (error) {
//    errorHandlerMiddleware(error, req, res, next);
//    console.log("from catch ", { error });
//  }
