import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: config.frontendDomain,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

export default app;
