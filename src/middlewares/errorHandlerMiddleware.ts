import { NextFunction, Request, Response } from "express";
import { UnAuthenticated } from "../class";
import BadRequest from "../class/BadRequest";
import CustomError from "../class/CustomError";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  // console.log(err instanceof CustomError ? "custom error" : "fallback error");
  console.log("ERRORHANDLER", err);

  const status = err.status || 500;
  const errorObj = {
    message: err.message,
    status: status,
  };
  // FOR CUSTOM ERROR
  if (err instanceof CustomError) {
    return res.status(status).json(errorObj);
  }

  // FOR BAD REQUEST ERROR
  if (err instanceof BadRequest) {
    return res.status(status).json({
      error: {
        message: err.message,
        text: "You catch the bad request error",
        status,
      },
    });
  }
  // FOR UNAUTHENTICATED ERROR
  if (err instanceof UnAuthenticated) {
    return res.status(status).json({
      error: {
        message: err.message,
        text: "You catch the unauthenticated error",
        status,
      },
    });
  }
  res.status(status).json({
    message: "Something went wrong",
    text: "you catch the generic error",
  });
};
