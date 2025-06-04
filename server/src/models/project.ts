//===============================================================================
// name: project.ts
// desc: Interface, Schema and Model of the project, apart from all necessary enums
//===============================Dependency Imports==============================
import mongoose from "mongoose";
//=================================Common Imports================================
import { taskInterface } from "./task";
//===============================================================================

/**
 * Interfaces are used in TypeScript
 * to tell a variable that they will have
 * this variables inside of it
 * (to see an example go to authApiControllers register)
 */
interface projectInterface {
  name: String;
  isFinalize: Boolean,
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

  tasks: [{
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks",
      required: false
    }
  }],
});

export default mongoose.model("Project", projectSchema);
export { projectInterface };