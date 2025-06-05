//===============================================================================
// name: task.ts
// desc: Interface, Schema and Model of the task, apart from all necessary enums
//===============================Dependency Imports==============================
import mongoose from "mongoose";
//===============================================================================

/** We put the enums apart from the schema to also 
 *  use it in the interface
 */

enum requestEnum {
  copyRevision = "Copy Revision",
  designIssues = "Design Issues",
  newItem = "New Item",
  requestedChange = "Requested Change"
}
enum statusEnum {
  onHold = "On Hold",
  needsInput = "Needs Input",
  assigned = "Assigned",
  inProgress = "In Progress",
  forDevTesting = "For Dev Testing",
  withFeedback = "With Feedback",
  forManagerTesting = "For Manager Testing",
  forClientReview = "For Client Review",
  complete = "Complete"
}

enum priorityEnum {
  urgent = 1,
  high = 2,
  normal = 3,
  low = 4
}

enum deviceEnum {
  mobile = "Mobile",
  tablet = "Tablet",
  desktop = "Desktop"
}

/**
 * Interfaces are used in TypeScript
 * to tell a variable that they will have
 * this variables inside of it
 * (to see an example go to authApiControllers register)
 */
interface taskInterface {
  id: number;
  clickUpTaskId: String;
  name: String;
  isSend: Boolean;
  requestType: requestEnum;
  status: statusEnum;
  priority: priorityEnum;
  inputDate: Date;
  estimateTime: Number;
  requester: String;
  device: deviceEnum;
  browser: String;
  request: String;
  page: String;
  screenshots: String;
}

/**
 * Due to having an interfaces, and the interface
 * and the schema needing to have the same variables 
 * inside of it, we force the Schema to always have
 * the variables the interface has by writting
 * mongoose.Schema<InterfaceName> instead of
 * mongoose.Schema
 */
const taskSchema = new mongoose.Schema<taskInterface>({
  id: {
    type: Number,
    required: true,
  },

  clickUpTaskId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  isSend : {
    type: Boolean,
    default : false
  },
  requestType: {
    type: String,
    enum: requestEnum,
    default: requestEnum.copyRevision
  },
  status: {
    type: String,
    enum: statusEnum,
    default: statusEnum.needsInput
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
  estimateTime: {
    type: Number,
    required: false
  },
  requester: {
    type: String,
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

export default mongoose.model("Task", taskSchema);
export { taskInterface };