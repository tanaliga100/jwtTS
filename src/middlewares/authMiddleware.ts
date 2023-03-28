import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import CustomError from "../class/ErrorClass";
import { IJwtPayload, RequestWithUser } from "../interfaces/all.interfaces";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError("No token provided", 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwtSecret") as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
};

export default authMiddleware;
