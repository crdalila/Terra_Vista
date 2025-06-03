//===============================================================================
// name: user.ts
// desc: Interface, Schema and Model of the user
//===============================Dependency Imports==============================
import mongoose from "mongoose";
//===============================================================================

/** We put the enums apart from the schema to also 
 *  use it in the interface
 */
enum roleEnum {
  projectManager = "projectManager",
  client = "client",
  admin = "admin",
}

/**
 * Interfaces are used in TypeScript
 * to tell a variable that they will have
 * this variables inside of it
 * (to see an example go to authApiControllers register)
 */
interface userInterface {
  clickUpToken : string;
  name: string;
  email: string;
  password: string;
  role: roleEnum;
  createdAt: Date;
  projects: [mongoose.Schema.Types.ObjectId];
}

/**
 * Due to having an interfaces, and the interface
 * and the schema needing to have the same variables 
 * inside of it, we force the Schema to always have
 * the variables the interface has by writting
 * mongoose.Schema<InterfaceName> instead of
 * mongoose.Schema
 */
const userSchema = new mongoose.Schema<userInterface>({
  clickUpToken : {
    type: String,
    required: false,

  },
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
    /**The role of the user
     * this can be admin, projectManager or client
     * the roles will make them able to go to more 
     * or less endpoints
    */
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
    /** An array of all projects the user is able to go to
     * The admin will be able to go to all
     * The project manager can only go to the ones they are managing
     * The client can only go to their projects (usually only one)
     */
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false
    }]
  },
});

export default mongoose.model("User", userSchema);
export { userInterface };