import crypto from "crypto";
import { promisify } from "util";
import config from "../config.js";

export const generateApiKey = async () => {
  return (await promisify(crypto.randomBytes)(48)).toString("hex");
};

export const encrypt = (text) => {
  const cipher = crypto.createCipher("aes-256-cbc", config.apiSecret);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (text) => {
  const decipher = crypto.createDecipher("aes-256-cbc", config.apiSecret);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
