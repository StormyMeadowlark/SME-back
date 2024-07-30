import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { encrypt } from "../utils/encryption.js";
import config from "../config.js";

export const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, config.SECRET_ACCESS_TOKEN, {
    expiresIn: rememberMe ? "7d" : user.role === "Customer" ? "9999y" : "12h",
  });

  const encryptedEmail = encrypt(user.email);
  const encryptedPassword = encrypt(user.password);

  user.encryptedEmail = encryptedEmail;
  user.encryptedPassword = encryptedPassword;
  user.rememberMe = rememberMe;

  await user.save();

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.status(200).json({ message: "Logged in successfully" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
