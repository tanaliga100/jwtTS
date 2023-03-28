import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../errors";
import { IJwtPayload, RequestWithUser } from "../interfaces/all.interfaces";

const authenticationMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new CustomError("No token provided", 401));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwtSecret") as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new CustomError("Not authorized to access this route", 401));
  }
};

export default authenticationMiddleware;
