//===============================================================================
// name: userApiController.ts
// desc: Controller of auth with the WRITE FUNCTION NAMES with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import userController from "./userController.ts";
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
//===============================================================================

async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await userController.getUserById(id);
    res.json(result);

  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getUserProjects(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = (await userController.getUserById(id)).projects;
    res.json(result);

  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await userController.editUser(id, data);
    res.json(result);

  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function removeUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result: number = await userController.removeUser(id);
    res.json(result == 1 ? "User correctly removed" :
      "There has been an error in the removing process");

  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

export default {
  getUserById,
  getUserProjects,
  editUser,
  removeUser
}