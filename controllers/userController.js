import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateApiKey, encrypt, decrypt } from "../utils/encryption.js";
import config from "../config.js";

export const register = async (req, res) => {
  const { email, password, role, employeeRole, customerType, shop } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, config.SALT_ROUNDS)
    : await bcrypt.hash("Pa$$word1234", config.SALT_ROUNDS);
  const apiKey = await generateApiKey();

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    employeeRole: role === "Employee" ? employeeRole : undefined,
    customerType: role === "Customer" ? customerType : undefined,
    shop: role === "Customer" ? shop : undefined,
    apiKey,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully", apiKey });
};

export const createShopOwner = async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
  const apiKey = await generateApiKey();

  const newShopOwner = new User({
    email,
    password: hashedPassword,
    role: "ShopOwner",
    apiKey,
  });

  await newShopOwner.save();
  res.status(201).json({ message: "ShopOwner created successfully", apiKey });
};

export const createCustomer = async (req, res) => {
  const { email, password, customerType, shop } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = password
    ? await bcrypt.hash(password, config.SALT_ROUNDS)
    : await bcrypt.hash("Pa$$word1234", config.SALT_ROUNDS);
  const apiKey = await generateApiKey();

  const newCustomer = new User({
    email,
    password: hashedPassword,
    role: "Customer",
    customerType,
    shop,
    apiKey,
  });

  await newCustomer.save();
  res.status(201).json({ message: "Customer created successfully", apiKey });
};

export const createEmployee = async (req, res) => {
  const { email, password, employeeRole } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
  const apiKey = await generateApiKey();

  const newEmployee = new User({
    email,
    password: hashedPassword,
    role: "Employee",
    employeeRole,
    apiKey,
  });

  await newEmployee.save();
  res.status(201).json({ message: "Employee created successfully", apiKey });
};
