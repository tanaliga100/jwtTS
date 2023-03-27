import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/connectDB";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { default as jwtRouter } from "./routes/main";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(morgan("dev"));

// ROUTES
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Server Alive : Express Ts" });
});

app.use("/api/v1", jwtRouter);

// 404 MIDDLEWARE
app.use(notFoundMiddleware);
// ERROR MIDDLEWARE
app.use(errorHandlerMiddleware);

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server alive: ${port}`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
start();
