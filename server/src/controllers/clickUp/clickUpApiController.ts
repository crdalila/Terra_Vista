//===============================================================================
// name: clickUpApiController.ts
// desc: Controller for ClickUp integration with workspace, spaces, and list functions
//===============================Dependency Imports==============================
import { Request, Response } from 'express';
//=================================Common Imports================================
//import { getDevFolderQAList } from '../../utils/clickUp/clickUpProjectUtils';
//import userController  from "../user/userController";
import clickUpController from "./clickUpController";
import Task from '../../models/task';
//================================Error Management===============================
import catchError from "../../utils/errors/controllerError";
//===============================================================================


// Get ClickUp spaces for a workspace
async function getSpaces(req: Request, res: Response) {
	try {
		const { userId } = req.params;
		const result = await clickUpController.getUserWorkspaceSpaces(userId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Ensure Dev Folder and QA List exist
async function ensureDevFolderQAList(req: Request, res: Response) {
	try {
		const { userId, spaceId } = req.params;
		const result = await clickUpController.ensureDevFolderQAList(userId, spaceId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get all ClickUp folders for a space
async function getFolders(req: Request, res: Response) {
	try {
		const { userId, spaceId } = req.params;
		const result = await clickUpController.getSpaceFolders(userId, spaceId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get all ClickUp list for a space
async function getLists(req: Request, res: Response) {
	try {
		const { userId, spaceId } = req.params;
		const result = await clickUpController.getFoldersLists(userId, spaceId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}
/*
// Sync task to ClickUp
async function syncTask(req: Request, res: Response) {
	try {
		const { userId } = req.params;
		const taskData = req.body;
		const result = await clickUpController.syncUserTask(userId, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}*/

// Create Task
async function createTask(req: Request, res: Response) {
	try {
		const { userId, listId } = req.params;
		const taskData = req.body;
		const result = await clickUpController.createTask(listId,userId, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

//Update task
async function updateTask(req: Request, res: Response) {
	try {
		const { userId, taskId } = req.params;
		const taskData = req.body;
		const result = await clickUpController.updateTask(userId, taskId, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

/*
// Update task status in ClickUp
async function updateTaskStatus(req: Request, res: Response) {
	try {
		const { userId, taskid } = req.params;
		const { status } = req.body;
		const result = await clickUpController.updateTaskStatus(userId, taskid, status);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}*/

// Delete task
async function deleteTask(req: Request, res: Response) {
	try {
		const { userId, taskId } = req.params;
		const result = await clickUpController.deleteTask(userId, taskId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get Info from a list
async function getClickUpInfo(req: Request, res: Response) {
	try {
		const { userId, listId } = req.params;
		const result = await clickUpController.getUserClickUpInfo(listId, userId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get Tasks not sent to clickUp
async function getPendingTasks(req: Request, res: Response) {
	try {
		const { userId } = req.params;
		const tasks = await Task.find({ requester: userId, isSend: false });
		res.status(200).json({
			success: true,
			pendingCount: tasks.length,
			tasks
		})
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
}


//===============================================================================
// Exports

export default{
	getSpaces,
	ensureDevFolderQAList,
	getFolders,
	getLists,
	//syncTask,
	createTask,
	updateTask,
	deleteTask,
	//updateTaskStatus,
	getClickUpInfo,
	getPendingTasks
}