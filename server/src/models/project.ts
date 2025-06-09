//===============================================================================
// name: project.ts
// desc: Interface, Schema and Model of the project
//===============================Dependency Imports==============================
import mongoose from "mongoose";
//=================================Common Imports================================
import { taskInterface } from "./task.ts";
//===============================================================================

/**
 * Interfaces are used in TypeScript
 * to tell a variable that they will have
 * this variables inside of it
 * (to see an example go to authApiControllers register)
 */
interface projectInterface {
  clickUpListId: String;
  clickUpFolderId: String;
  clickUpSpaceId: String;
  clickUpWebhookId: String;
  name: String;
  description: String;
  notifications: String[];
  isFinalize: Boolean;
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
  clickUpListId: {
    type: String,
    required: true
  },
  clickUpFolderId: {
    type: String,
    required: true
  },
  clickUpSpaceId: {
    type: String,
    required: true
  },
  clickUpWebhookId: {
    type: String,
    required: false,
  },
  isFinalize: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: "Project Name",
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "This is the description of the project.",
    required: true,
    trim: true
  },
  notifications: {
    type: [String],
    required: false,
    default: ["firstNotif","secondNotif"]
  },
  tasks: [{
    /** An array of all projects the user is able to go to
     * The admin will be able to go to all
     * The project manager can only go to the ones they are managing
     * The client can only go to their projects (usually only one)
    */
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: false

  }],
});

export default mongoose.model("Project", projectSchema);
export { projectInterface };