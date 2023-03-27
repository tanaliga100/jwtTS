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
