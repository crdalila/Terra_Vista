import mongoose from "mongoose";

enum roleEnum {
  projectManager = "projectManager",
  client = "client",
  admin = "admin",
}

interface userInterface {
  name: string;
  email: string;
  password: string;
  role: roleEnum;
  createdAt: Date;
  projects: [mongoose.Schema.Types.ObjectId];
}

const userSchema = new mongoose.Schema<userInterface>({
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
    enum: roleEnum,
    required: true,
    default: roleEnum.client
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
export default mongoose.model("User", userSchema);
export {
  roleEnum,
  userInterface
}