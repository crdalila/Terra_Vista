//===============================================================================
// name: userController.ts
//=================================Common Imports================================
import { ObjectId } from "mongoose";
import User, { userInterface } from "../../models/user.ts";
//================================Error Management===============================
import { ProjectIsNotInUser, UserDoesNotExist, UserInvalidPassword } from "../../utils/errors/userErrors.ts"
import { isPasswordCorrect } from "../../utils/passwordChecking.ts";
import { hash } from "../../utils/bcrypt.ts";
//===============================================================================

//User
async function getUserById(id: string) {

  //Finds user, makes projects model be inside, removes password in the return
  const user = await User.findById(id).populate({
    path: 'projects',
    select: '-clickUpListId -clickUpFolderId -clickUpSpaceId',
    populate: {
      path: 'tasks',
      select: '-clickUpTaskId'
    }
  }).select("-clickUpToken -clickUpWorkspaceId -password");

  if (!user) throw new UserDoesNotExist();
  return user;
}

async function editUserPassword(id: string, newPassword: string) {
  //Error checking for password
  if (!isPasswordCorrect(newPassword)) throw new UserInvalidPassword();
  const hashedPassword = await hash(newPassword);

  const updatedUser = User.findOneAndUpdate(
    { _id: id }, //Tries finding user by its id
    { $set: { password: hashedPassword } }, //changes the password
    { new: true }).select("-clickUpToken -clickUpWorkspaceId -password"); //makes it returns the updated version

  if (!updatedUser) throw new UserDoesNotExist();
  return updatedUser;
}

//Admin
async function getAllUsers() {

  //Finds all users, makes projects model be inside, removes password in the return
  const users = await User.find().populate({
    path: 'projects',
    select: '-clickUpListId -clickUpFolderId -clickUpSpaceId',
    populate: {
      path: 'tasks',
      select: '-clickUpTaskId'
    }
  }).select("-clickUpToken -clickUpWorkspaceId -password");
  if (!users || users.length <= 0) throw new UserDoesNotExist();
  return users;
}

async function editUser(id: string, data: userInterface) {
  console.log(data.password);
  if (data.password && !isPasswordCorrect(data.password)) throw new UserInvalidPassword();
  //Finds user, change the data inside,
  //Makes projects model be inside, removes password in the return
  const user = await User.findByIdAndUpdate(
    id, data, { new: true }).populate({
    path: 'projects',
    select: '-clickUpListId -clickUpFolderId -clickUpSpaceId',
    populate: {
      path: 'tasks',
      select: '-clickUpTaskId'
    }
  }).select("-clickUpToken -clickUpWorkspaceId -password");
  if (!user) throw new UserDoesNotExist();
  return user;
}

async function removeUser(id: string) {

  // Finds and deletes user
  await User.findByIdAndDelete(id);
  return 1;
}

async function addProjectToUser(userId: string, projectId: string) {
  //Get user
  let user: userInterface = (await User.findById(userId)) as userInterface;

  if (!user) throw new UserDoesNotExist();
  //Get only the password from the data changed 
  user.projects.push(projectId as unknown as ObjectId);
  //Update the user password
  const userWithNewPassword = await User.findByIdAndUpdate(
    userId, user, { new: true }).populate({
    path: 'projects',
    select: '-clickUpListId -clickUpFolderId -clickUpSpaceId',
    populate: {
      path: 'tasks',
      select: '-clickUpTaskId'
    }
  }).select("-clickUpToken -clickUpWorkspaceId -password");
  return userWithNewPassword;
}

async function removeProjectToUser(userId: string, projectId: string) {
  //Get user
  let user: userInterface = (await User.findById(userId)) as userInterface;
  if (!user) throw new UserDoesNotExist();
  //Get only the password from the data changed 
  const indexOfDeleted = user.projects.indexOf(projectId as unknown as ObjectId);
  if (indexOfDeleted == -1) throw new ProjectIsNotInUser();
  user.projects.splice(indexOfDeleted, 1);
  //Update the user password
  const userWithNewPassword = await User.findByIdAndUpdate(
    userId, user, { new: true }).populate({
    path: 'projects',
    select: '-clickUpListId -clickUpFolderId -clickUpSpaceId',
    populate: {
      path: 'tasks',
      select: '-clickUpTaskId'
    }
  }).select("-clickUpToken -clickUpWorkspaceId -password");
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