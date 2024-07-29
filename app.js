import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import config from "./config.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import groupRouter from "./routes/groupRoutes.js";


const app = express();

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors((req, callback) => {
    const corsOptions = {
      origin: false, // Disable CORS by default
    };

    const whitelist = ["http://127.0.0.1:5173", "http://localhost:3000"]; // List of allowed origins
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions.origin = true; // Reflect (enable) the requested origin in the CORS response
    }

    callback(null, corsOptions); // Callback expects two parameters: error and options
  })
);


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/groups", groupRouter);


export default app;
