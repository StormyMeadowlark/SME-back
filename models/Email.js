import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  subject: String,
  text: String,
  sentAt: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', emailSchema);
export default Email
