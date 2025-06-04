//===============================================================================
// name: clickUpApiController.ts
// desc: Controller for ClickUp integration with workspace, spaces, and list functions
//===============================Dependency Imports==============================
import { Request, Response } from 'express';
//=================================Common Imports================================

import clickUpController from "./clickUpController";
//================================Error Management===============================
import catchError from "../../utils/errors/controllerError";
//===============================================================================


// Get ClickUp spaces for a workspace
async function getSpaces(req: Request, res: Response) {
	try {
		const { userid, workspaceid } = req.params;
		const result = await clickUpController.getUserWorkspaceSpaces(userid, workspaceid);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get all ClickUp folders for a space
async function getFolders(req: Request, res: Response) {
	try {
		const { userid, spaceid } = req.params;
		const result = await clickUpController.getSpaceFolders(userid, spaceid);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get all ClickUp list for a space
async function getLists(req: Request, res: Response) {
	try {
		const { userid, spaceid } = req.params;
		const result = await clickUpController.getFoldersLists(userid, spaceid);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Sync task to ClickUp
async function syncTask(req: Request, res: Response) {
	try {
		const { userid } = req.params;
		const taskData = req.body;
		const result = await clickUpController.syncUserTask(userid, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Create Task
async function createTask(req: Request, res: Response) {
	try {
		const { userid, listId } = req.params;
		const taskData = req.body;
		const result = await clickUpController.createTask(listId,userid, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

//Update task
async function updateTask(req: Request, res: Response) {
	try {
		const { userid, taskId } = req.params;
		const taskData = req.body;
		const result = await clickUpController.updateTask(userid, taskId, taskData);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}


// Update task status in ClickUp
async function updateTaskStatus(req: Request, res: Response) {
	try {
		const { userid, taskid } = req.params;
		const { status } = req.body;
		const result = await clickUpController.updateTaskStatus(userid, taskid, status);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Delete task
async function deleteTask(req: Request, res: Response) {
	try {
		const { userid, taskId } = req.params;
		const result = await clickUpController.deleteTask(userid, taskId);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

// Get Info from a list
async function getClickUpInfo(req: Request, res: Response) {
	try {
		const { userid, listId } = req.params;
		const result = await clickUpController.getUserClickUpInfo(listId, userid);
		res.status(200).json({ success: true, data: result });
	} catch (error: any) {
		const myError = catchError(error);
		res.status(myError.statusCode).json(myError.message);
	}
}

//===============================================================================
// Exports

export default{
	getSpaces,
	getFolders,
	getLists,
	syncTask,
	createTask,
	updateTask,
	deleteTask,
	updateTaskStatus,
	getClickUpInfo
}