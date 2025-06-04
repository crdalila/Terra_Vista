//===============================================================================
// name: userApiController.ts
// desc: Controller of user with the WRITE FUNCTION NAMES with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import projectController from "./projectController.ts";
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
//===============================================================================

async function getProjectById(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getAllProject(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function createProject(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editProject(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function removeProject(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function finalizeProject(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}


async function createTask(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editTask(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function deleteTask(req: Request, res: Response) {
  try {
    
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}




export default {
  getProjectById,
  getAllProject,
  createProject,
  editProject,
  removeProject,
  createTask,
  editTask,
  deleteTask,
}