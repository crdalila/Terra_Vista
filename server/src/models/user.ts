import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["projectManager", "client", "admin"],
    required: true,
    default: "client"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  projects: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: false
    }]
  },
});

export default mongoose.model("User", userSchema)