import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String, required: true },
  skills: { type: String, required: true },
  expectedPay: { type: String, required: true },
  education: { type: String, required: true },
  jobHistory: { type: String, required: true },
  resumeFilename: { type: String, required: true },
  resumeContentType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;