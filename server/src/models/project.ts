import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  requestType: {
    type: String,
    enum: ["Copy Revision", "Design Issues", "New Item", "Requested Change"],
    default: "Copy Revision"
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Complete"],
    default: "To Do"
  },
  priority: {
    type: String,
    enum: ["Urgent", "High", "Normal", "Low"],
    default: "Low"
  },
  inputDate: {
    type: Date,
    default: Date.now
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  device: {
    type: String,
    enum: ["Mobile", "Tablet", "Desktop"],
    required: false
  },
  browser: {
    type: String,
    required: false
  },
  request: {
    type: String,
    required: true,
    trim: true
  },
  page: {
    type: String,
    required: true
  },
  screenshots: {
    type: String,
    required: false
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  task: {
    type: [{
      type: taskSchema,
      required: true
    }],
    required: false
  },

});

export default mongoose.model("Project", projectSchema);