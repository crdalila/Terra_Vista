//===============================================================================
// name: projectApiController.ts
// desc: Controller of user with the 
// getProjectById, getAllProjects, getProjectTasks,
// createProject, editProject, removeProject, 
// finalizeProject, createTaskIntoProject,editTaskFromProject, 
// deleteTaskFromProject with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import Project from '../../models/project.ts';
import Task from "../../models/task.ts";
import projectController from "./projectController.ts";
import { projectInterface } from '../../models/project.ts';
import clickUpController from '../clickUp/clickUpController.ts';
import userController from "../user/userController.ts"
import { createClickUpWebhook } from '../../utils/clickUp/webhookUtils.ts';
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
import { ProjectAlreadyExists } from '../../utils/errors/projectError.ts';
import { UserNotFound, ClickUpSpaceIdNotProvided } from '../../utils/errors/clickUpError.ts';
import { IGetUserAuthInfoRequest } from '../../utils/token.ts';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { taskInterface } from '../../models/task.ts';
import { removeFile } from '../../utils/middlewares/multerMiddleware.ts';
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

async function getProjectNotifsById(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const id = req.params.id;

    //Do the function and send the result in json format
    const result = ((await projectController.getProjectById(id)).notifications);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getAllProjects(_: Request, res: Response) {
  try {
    //Do the function and send the result in json format
    const result = (await projectController.getAllProjects());
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getAllProjectsNotifs(_: Request, res: Response) {
  try {
    //Do the function and send the result in json format
    const result = (await projectController.getAllProjectsNotifs());
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
    const projectManagerId = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    const projectData: projectInterface = req.body;
    const { clickUpSpaceId } = projectData; //TODO

    if (!projectManagerId) throw new UserNotFound();
    if (!clickUpSpaceId) throw new ClickUpSpaceIdNotProvided();

	// Check if project already exists
	const existingProject = await Project.findOne({ clickUpSpaceId });
	if (existingProject) {
		throw new ProjectAlreadyExists();
	}

    const {
      folderId: clickUpFolderId,
      listId: clickUpListId
    } = await clickUpController.ensureDevFolderQAList(projectManagerId, String(clickUpSpaceId));

    // Add new data to project
    projectData.clickUpFolderId = clickUpFolderId;
    projectData.clickUpListId = clickUpListId;

	// Create webhook
	const webhookId = await createClickUpWebhook(clickUpListId);
	projectData.clickUpWebhookId = webhookId;

    //Do the function and send the result in json format
    const result: projectInterface & {
      _id: Types.ObjectId;
    } = (await projectController.createProject(projectData));

    await userController.addProjectToUser(projectManagerId, result._id.toString());

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
    const filter = req.params.filter;

    //Do the function and send the result in json format
    const result = (await projectController.getProjectById(id));
    console.log("Filter",filter);
    const tasks = projectController.getFilteredTasks(result.tasks, filter);
    res.json(tasks);
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
    const taskData: taskInterface = req.body;

    const userId = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    taskData.requester = userId;

    taskData.screenshots = req.file?.filename as String;

    //Do the function and send the result in json format
    const result = (await projectController.createTask(projectId, taskData));
    res.json(result);
  } catch (error) {
    console.log("Entered in error area");
    console.error(error);

    if (req.file?.filename) {
      removeFile(req.file.filename);
    }

    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function editTaskFromProject(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const taskData = req.body;
    taskData.screenshots = req.file?.filename as String;

    //Do the function and send the result in json format
    const result = (await projectController.editTask(projectId, taskId, taskData));
    res.json(result);
  } catch (error) {

    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function getTaskById(req: Request, res: Response): Promise<void>{
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			res.status(404).json({ message: "Task not found" });
			return;
		}

		res.json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching task" });
	}
};

async function deleteTaskFromProject(req: Request, res: Response) {
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
  getProjectNotifsById,
  getAllProjects,
  getProjectTasks,
  getAllProjectsNotifs,
  createProject,
  editProject,
  removeProject,
  finalizeProject,
  createTaskIntoProject,
  editTaskFromProject,
  deleteTaskFromProject,
  getTaskById
}