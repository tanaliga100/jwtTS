export interface IToken {
  JWT_SECRET: string;
  EXPIRES_IN: string;
}
export interface IJwtPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}
import { Request as ExpressRequest } from "express";

export interface RequestWithUser extends ExpressRequest {
  user?: { id: number; username: string }; // add any properties you need here
}
