import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors";
import { IJwtPayload, RequestWithUser } from "../interfaces/all.interfaces";

const authenticationMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new UnAuthenticatedError("No token provided"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwtSecret") as IJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      new UnAuthenticatedError("Not authorized to access this route")
    );
  }
};

export default authenticationMiddleware;
