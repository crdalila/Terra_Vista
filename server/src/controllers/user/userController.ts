//===============================================================================
// name: userController.ts
// desc: Controller of user with TELL WHAT FUNCTIONS THERE ARE
//=================================Common Imports================================
import User from "../../models/user.ts";
//================================Error Management===============================
import { UserDoesNotExist } from "../../utils/errors/userErrors.js"
//===============================================================================

async function getUserById(id: string) {
  const user = await User.findById(id).select("-password");
  if (user === null) throw new UserDoesNotExist();
  return user;
}

async function editUser(id: string, data: object) {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
  return user;
}

async function removeUser(id: string) {
  const user = await User.findByIdAndDelete(id);
  if (user === null) {
    throw new UserDoesNotExist();
  }
  return 1;
}

export default {
  getUserById,
  editUser,
  removeUser
}