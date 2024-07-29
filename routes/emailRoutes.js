import express from "express";
import { sendQuoteEmail } from "../controllers/emailController.js";

const emailRouter = express.Router();

emailRouter.post("/send-quote", sendQuoteEmail);

export default emailRouter;
