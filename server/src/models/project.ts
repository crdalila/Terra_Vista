//===============================================================================
// name: project.ts
// desc: Interface, Schema and Model of the project, apart from all necessary enums
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
  toDo = "To Do",
  inProgress = "In Progress",
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
  name: String;
  requestType: requestEnum;
  status: statusEnum;
  priority: priorityEnum;
  inputDate: Date;
  estimateTime: Number;
  requester: mongoose.Schema.Types.ObjectId;
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
  estimateTime: {
    type: Number,
    required: false
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

/**
 * Interfaces are used in TypeScript
 * to tell a variable that they will have
 * this variables inside of it
 * (to see an example go to authApiControllers register)
 */
interface projectInterface {
  name: String;
  tasks: [taskInterface];
}

/**
 * Due to having an interfaces, and the interface
 * and the schema needing to have the same variables 
 * inside of it, we force the Schema to always have
 * the variables the interface has by writting
 * mongoose.Schema<InterfaceName> instead of
 * mongoose.Schema
 */
const projectSchema = new mongoose.Schema<projectInterface>({
  name: {
    type: String,
    required: true,
    trim: true
  },

  tasks: {
    type: [{
      type: taskSchema,
      required: true
    }],
    required: false
  },

});

export default mongoose.model("Project", projectSchema);
export {taskInterface, projectInterface};