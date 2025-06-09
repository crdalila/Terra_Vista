//===============================================================================
// name: userController.ts
//=================================Common Imports================================
import { ObjectId } from "mongoose";
import User, { userInterface } from "../../models/user.ts";
import Project from "../../models/project.ts";
//================================Error Management===============================
import { ProjectIsNotInUser, UserDoesNotExist, UserInvalidCredentials, UserInvalidPassword } from "../../utils/errors/userErrors.ts"
import { isPasswordCorrect } from "../../utils/passwordChecking.ts";
import { compare, hash } from "../../utils/bcrypt.ts";
import { projectSelect, taskSelect, userSelect } from "../../utils/modelsSelect.ts";
//===============================================================================

//User
async function getUserById(id: string) {

  //Finds user, makes projects model be inside, removes password in the return
  const user = await User.findById(id).populate({
    path: 'projects',
    select: projectSelect,
    populate: {
      path: 'tasks',
      select: taskSelect
    }
  }).select(userSelect);

  if (!user) throw new UserDoesNotExist();
  return user;
}

async function getUsersNotifications(id: string) {
  const user = await User.findById(id).select(userSelect);
  if (!user) throw new UserDoesNotExist();

  let projectsNotif: String[] = [];

  for await (let projectId of user.projects) {
    let project = await Project.findById(projectId);

    if (project) {
      console.log(project);
      project.notifications.forEach((notif) => {
        projectsNotif.push(notif);
      })
    }
  }

  return projectsNotif;
}


async function editUserPassword(id: string,
  currentPassword: string, newPassword: string, confirmPassword: string) {
  //Error checking for password
  if (!isPasswordCorrect(newPassword)) throw new UserInvalidPassword();
  if (!isPasswordCorrect(confirmPassword)) throw new UserInvalidPassword();
  if (!isPasswordCorrect(currentPassword)) throw new UserInvalidPassword();

  if (newPassword != confirmPassword) throw new UserInvalidPassword();

  const user = await User.findById(id).populate({
    path: 'projects',
    select: projectSelect,
    populate: {
      path: 'tasks',
      select: taskSelect
    }
  }).select("-clickUpToken -clickUpWorkspaceId");
  if (!user) throw new UserDoesNotExist();

  const isSamePassword = await compare(currentPassword, user.password);
  if (!isSamePassword) throw new UserInvalidCredentials();

  const hashedPassword = await hash(newPassword);
  user.password = hashedPassword;
  await user.save();
  user.password = "";
  return user;
}

//Admin
async function getAllUsers() {

  //Finds all users, makes projects model be inside, removes password in the return
  const users = await User.find().populate({
    path: 'projects',
    select: projectSelect,
    populate: {
      path: 'tasks',
      select: taskSelect
    }
  }).select(userSelect);
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
      select: projectSelect,
      populate: {
        path: 'tasks',
        select: taskSelect
      }
    }).select(userSelect);
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
      select: projectSelect,
      populate: {
        path: 'tasks',
        select: taskSelect
      }
    }).select(userSelect);
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
      select: projectSelect,
      populate: {
        path: 'tasks',
        select: taskSelect
      }
    }).select(userSelect);
  return userWithNewPassword;
}

export default {
  getUserById,
  getAllUsers,
  getUsersNotifications,
  editUser,
  editUserPassword,
  removeUser,
  addProjectToUser,
  removeProjectToUser
}