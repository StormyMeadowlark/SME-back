import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: String },
  education: { type: String },
  skills: { type: String },
  resumePath: { type: String }, // Path to the stored resume file
  appliedOn: { type: Date, default: Date.now },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;