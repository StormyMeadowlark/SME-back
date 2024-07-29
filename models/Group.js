import mongoose from "mongoose";
import crypto from "crypto";


// Encryption secret and algorithm
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-32-byte-key-here"; // Must be 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

// Function to encrypt text
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Function to decrypt text
const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, set: encrypt, get: decrypt },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["Admin", "User", "Member"],
        default: "Member",
      },
    },
  ],
}, { toJSON: { getters: true }, toObject: { getters: true } });

const Group = mongoose.model("Group", groupSchema);

export default Group;
