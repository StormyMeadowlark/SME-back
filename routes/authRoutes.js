import express from "express";
import { login, logout } from "../controllers/authController.js";
import {
  register,
  createShopOwner,
  createCustomer,
  createEmployee,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);





authRouter.post("/register", register);
authRouter.post("/create-shopOwner", authenticate(["Developer"]), createShopOwner);
authRouter.post("/create-customer", authenticate(["Developer"]), createCustomer);
authRouter.post("/create-employee", authenticate(["ShopOwner"]), createEmployee);

export default authRouter;
