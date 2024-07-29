import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: {
    type: String,
    enum: ["Developer", "ShopOwner", "Employee", "Customer"],
    default: "Customer",
  },
  employeeRole: {
    type: String,
    enum: ["Administration", "Technician", "Manager", "Forman"],
    default: "Technician",
  },
  customerType: {
    type: String,
    enum: ["Retail", "Dealership", "Fleet", "Other"],
    default: "Retail",
  },
  shop: { type: String },
  apiKey: { type: String },
  encryptedEmail: { type: String },
  encryptedPassword: { type: String },
  rememberMe: { type: Boolean, default: false },
  emails: [{ type: Schema.Types.Object, ref: "Email" }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group", unique: true }],
});

const User = mongoose.model("User", userSchema);

export default User;
