import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { BadRequestError, CustomError } from "../errors";
import {
  IJwtPayload,
  IToken,
  RequestWithUser,
} from "../interfaces/all.interfaces";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
import { errorHandlerMiddleware } from "../middlewares/errorHandlerMiddleware";
dotenv.config();

// LOGIN CONTROLLER
const login = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError("Please provide both email and password");
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

// DASHBOARD CONTROLLER WITH AUTHENTICATION MIDDLEWARE
const dashboard = asyncMiddleware(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const decoded = req.user;
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded?.username}`,
      secret: `Here is your lucky number : ${luckyNumber}`,
    });
  }
);
export { dashboard, login };

// // DASHBOARD CONTROLLER
// const dashboard = asyncMiddleware(
//   async (req: RequestWithUser, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer")) {
//       throw new CustomError("No token provided", 401);
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//       const decoded = jwt.verify(token, "jwtSecret") as IJwtPayload;
//       const luckyNumber = Math.floor(Math.random() * 100);
//       res.status(200).json({
//         msg: `Hello ${decoded.username}`,
//         secret: `Here is your lucky number : ${luckyNumber}`,
//       });
//     } catch (error) {
//       throw new CustomError("Not authorized to access this route", 401);
//     }
//   }
// );
