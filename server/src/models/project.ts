import mongoose from "mongoose"

enum requestEnum {
  copyRevision = "Copy Revision",
  designIssues = "Design Issues",
  newItem = "New Item",
  requestedChange = "Requested Change"
}
enum statusEnum {
  toDo = "To Do",
  inProgress = "In Progress",
  complete = "Complete"
}

enum priorityEnum {
  urgent = 0,
  high = 1,
  normal = 2,
  low = 3
}

enum deviceEnum {
  mobile = "Mobile",
  tablet = "Tablet",
  desktop = "Desktop"
}

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  requestType: {
    type: String,
    enum: requestEnum,
    default: requestEnum.copyRevision
  },
  status: {
    type: String,
    enum: statusEnum,
    default: statusEnum.toDo
  },
  priority: {
    type: Number,
    enum: priorityEnum,
    default: priorityEnum.low
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
    enum: deviceEnum,
    default: deviceEnum.mobile,
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