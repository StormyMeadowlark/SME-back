import express from "express";
import {
  createGroup,
  getUserGroups,
  addGroupMember,
} from "../controllers/groupController.js";
import authenticate from "../middleware/authMiddleware.js";

const groupRouter = express.Router();

// Routes
groupRouter.post("/create", authenticate, createGroup);
groupRouter.get("/me", authenticate, getUserGroups);
groupRouter.post("/add-member", authenticate, addGroupMember);

export default groupRouter;
