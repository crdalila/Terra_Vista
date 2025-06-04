//===============================================================================
// name: userController.ts
// desc: Controller of user with TELL WHAT FUNCTIONS THERE ARE
//=================================Common Imports================================
import { ObjectId } from "mongoose";
import User, { userInterface } from "../../models/user.ts";
//================================Error Management===============================
import { UserDoesNotExist } from "../../utils/errors/userErrors.ts"
//===============================================================================

//User
async function getUserById(id: string) {
  const user = await User.findById(id).populate("Project").select("-password");
  if (user === null) throw new UserDoesNotExist();
  return user;
}

async function editUserPassword(id: string, data: userInterface) { // Need to be checked
  //Get user
  let user: userInterface = (await User.findById(id)) as userInterface;
  //Get only the password from the data changed 
  user.password = data.password;
  //Update the user password
  const userWithNewPassword = await User.findByIdAndUpdate(
    id, user, { new: true }).populate("Project").select("-password");
  return userWithNewPassword;
}

//Admin
async function getAllUsers() {
  const users = User.find().populate("Project");
  return users;
}

async function editUser(id: string, data: userInterface) {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).populate("Project").select("-password");
  return user;
}

async function removeUser(id: string) {
  const user = await User.findByIdAndDelete(id);
  if (user === null) throw new UserDoesNotExist();
  return 1;
}

async function addProjectToUser(userId: string, projectId: string) {
  //Get user
  let user: userInterface = (await User.findById(userId)) as userInterface;
  //Get only the password from the data changed 
  user.projects.push(projectId as unknown as ObjectId);
  //Update the user password
  const userWithNewPassword = await User.findByIdAndUpdate(
    userId, user, { new: true }).populate("Project").select("-password");
  return userWithNewPassword;
}

async function removeProjectToUser(userId: string, projectId: string) {
  //Get user
  let user: userInterface = (await User.findById(userId)) as userInterface;

  //Get only the password from the data changed 
  const indexOfDeleted = user.projects.indexOf(projectId as unknown as ObjectId);
  if(indexOfDeleted == -1) throw new Error("Need to add error");
  user.projects.splice(indexOfDeleted,1);
  //Update the user password
  const userWithNewPassword = await User.findByIdAndUpdate(
    userId, user, { new: true }).populate("Project").select("-password");
  return userWithNewPassword;
}

export default {
  getUserById,
  getAllUsers,
  editUser,
  editUserPassword,
  removeUser,
  addProjectToUser,
  removeProjectToUser
}