import express from "express";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ApiError } from "./utils/ApiError";
import { Request, Response, NextFunction } from "express";

const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
// routes
// app.use("/api/auth", authRouter)
// app.use("/api/images", imageRouter)
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorMiddleware);

export default app;
