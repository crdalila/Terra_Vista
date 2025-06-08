//===============================================================================
// name: userApiController.ts
// desc: Controller of user with the
// getUserById, getUserByCookie, getUserProjects, editUserPassword,
// getAllUsers, editUser, removeUser,
// addProjectToUser, removeProjectToUser
// with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import userController from "./userController.ts";
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
import { IGetUserAuthInfoRequest } from '../../utils/token.ts';
import { JwtPayload } from 'jsonwebtoken';
//===============================================================================


//User
async function getUserById(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = await userController.getUserById(id);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getUserByCookie(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;

    //Do the function and send the result in json format
    const result = await userController.getUserById(id);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}


async function getUserProjects(req: Request, res: Response) {
  try {

    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = (await userController.getUserById(id)).projects;
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getUserNotifs(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;
    
    //Do the function and send the result in json format
    const result = (await userController.getUsersNotifications(id));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editUserPassword(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    //Do the function and send the result in json format
    const result = await userController.editUserPassword(id, 
      currentPassword, newPassword, confirmPassword );
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}
//Admin
//Create user is the register in authController.
async function getAllUsers(_: Request, res: Response) {
  try {
    //Do the function and send the result in json format
    const result = await userController.getAllUsers();
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editUser(req: Request, res: Response) {
  try {

    //Get parameters for function to work
    const id = req.params.id;
    const data = req.body;

    //Do the function and send the result in json format
    const result = await userController.editUser(id, data);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function removeUser(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result: number = await userController.removeUser(id);
    res.json(result == 1 ? "User correctly removed" :
      "There has been an error in the removing process");
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

//Admin and Project Manager
async function addProjectToUser(req: Request, res: Response) {
  try {

    //Get parameters for function to work
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    //Do the function and send the result in json format
    const result = await userController.addProjectToUser(userId, projectId);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function removeProjectToUser(req: Request, res: Response) {
  try {

    //Get parameters for function to work
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    //Do the function and send the result in json format
    const result = await userController.removeProjectToUser(userId, projectId);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}


export default {
  getUserById,
  getUserByCookie,
  getUserProjects,
  editUserPassword,
  getUserNotifs,
  getAllUsers,
  editUser,
  removeUser,
  addProjectToUser,
  removeProjectToUser
}