import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnAuthenticated } from "../class";
import { asyncMiddleware } from "./asyncMiddleware";

interface IUser {
  username: string;
  id: number | string;
}

const authenticationMiddleware = asyncMiddleware(
  async (req: Request | IUser | any, res: Response, next: NextFunction) => {
    // CHECK THE AUTH HEADER...
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnAuthenticated("UNAUTHENTICATED: No token provided");
    }

    try {
      // VERIFY THE TOKEN AND DECODE...USING TRY CATCH
      const authToken = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        authToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnAuthenticated(
        "UNAUTHORIZED: Not authorized to access this route"
      );
    }
  }
);

export default authenticationMiddleware;
