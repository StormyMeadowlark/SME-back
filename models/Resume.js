import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "uploads.files",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", ResumeSchema);
