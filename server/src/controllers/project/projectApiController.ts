//===============================================================================
// name: projectApiController.ts
// desc: Controller of user with the 
// getProjectById, getAllProject, getProjectTasks,
// createProject, editProject, removeProject, 
// finalizeProject, createTaskIntoProject,editTaskIntoProject, 
// deleteTaskIntoProject with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import projectController from "./projectController.ts";
import { projectInterface } from '../../models/project.ts';
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
//===============================================================================

async function getProjectById(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = (await projectController.getProjectById(id));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getAllProject(_: Request, res: Response) {
  try {
    //Do the function and send the result in json format
    const result = (await projectController.getAllProject());
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function createProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const projectData: projectInterface = req.body;

    //Do the function and send the result in json format
    const result = (await projectController.createProject(projectData));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;
    const projectData: projectInterface = req.body;

    //Do the function and send the result in json format
    const result = (await projectController.editProject(id, projectData));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function removeProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = (await projectController.removeProject(id));
    res.json(result == 1 ? "Project correctly removed" :
      "There has been an error in the removing process");
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function finalizeProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = (await projectController.finalizeProject(id));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}
//================================Tasks================================
async function getProjectTasks(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = (await projectController.getProjectById(id));
    res.json(result.tasks);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }

}

async function createTaskIntoProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const projectId = req.params.id;
    const taskData = req.body;

    //Do the function and send the result in json format
    const result = (await projectController.createTask(projectId, taskData));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editTaskIntoProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const taskData = req.body;

    //Do the function and send the result in json format
    const result = (await projectController.editTask(projectId, taskId, taskData));
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function deleteTaskIntoProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    //Do the function and send the result in json format
    const result = (await projectController.deleteTask(projectId, taskId));
    res.json(result);

  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}




export default {
  getProjectById,
  getAllProject,
  getProjectTasks,
  createProject,
  editProject,
  removeProject,
  finalizeProject,
  createTaskIntoProject,
  editTaskIntoProject,
  deleteTaskIntoProject,
}