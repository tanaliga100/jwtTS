import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequest } from "../class";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";
dotenv.config();

const login = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      throw new BadRequest("Please provide both and password");
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

const dashboard = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your lucky number : ${luckyNumber}`,
    data: { ...req.user, luckyNumber },
  });
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
