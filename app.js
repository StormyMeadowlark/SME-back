import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import dotenv from "dotenv";
import { createApplication } from "./controllers/applicationController.js";
import footerMapApiKeyRoutes from "./routes/footerMapApiKeyRoutes.js"

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
const whitelist = [
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "https://my-garage-ed2e46b8c87b.herokuapp.com",
  "https://hemautomotive.com"
];
const corsOptions = (req, callback) => {
  let options;
  if (whitelist.includes(req.header("Origin"))) {
    options = { origin: true }; // Reflect (enable) the requested origin in the CORS response
  } else {
    options = { origin: false }; // Disable CORS for this request
  }
  callback(null, options); // Callback expects two parameters: error and options
};
app.use(cors(corsOptions));


  // Routes
  app.get("/", (req, res) => {
    res.send("API is running");
  });
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/email", emailRouter);
  app.use("/api/v1/groups", groupRouter);
  app.use("/api/v1/application", createApplication);
  app.use("/api/v1/key/footer-map", footerMapApiKeyRoutes);

// Handle connection errors


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();
;

export default app;
