import express from "express";
import {
  register,
  createShopOwner,
  createCustomer,
  createEmployee,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/create-shopOwner", authenticate(["Developer"]), createShopOwner);
userRouter.post("/create-customer", authenticate(["Developer"]), createCustomer);
userRouter.post("/create-employee", authenticate(["ShopOwner"]), createEmployee);

export default userRouter;
