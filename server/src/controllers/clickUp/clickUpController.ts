//===============================================================================
// name: clickUpController.ts
// desc: Controller for ClickUp business logic with validation and error handling
//=================================Common Imports================================

import User, { userInterface } from "../../models/user";
import {
	getClickUpInfo,
	getAllClickUpFolders,
	getClickUpSpaces,
	getAllClickUpLists,
} from "../../utils/clickUp/clickUpProjectUtils";

import {
	createClickUpTask,
	updateClickUpTask,
	deleteClickUpTask,
} from "../../utils/clickUp/clickUpTaskUtils";

import {
	syncTaskToClickUp,
	updateTaskStatusInClickUp
} from "../../utils/clickUp/taskSyncService";
import {
	UserNotFound,
	ClickUpTokenNotProvided,
	ClickUpWorkspaceIdNotProvided,
	ClickUpSpaceIdNotProvided,
	ClickUpTaskDataNotProvided,
	ClickUpTaskIdNotProvided,
	ClickUpStatusNotProvided,
	ClickUpAPIError
} from "../../utils/errors/clickUpError";

// Get User Workspace Spaces
async function getUserWorkspaceSpaces(userid:string, workspaceId: string) {
	if (!userid) throw new UserNotFound();
	if (!workspaceId) throw new ClickUpWorkspaceIdNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getClickUpSpaces(user.clickUpToken, workspaceId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
};

// Get Space Folders
async function getSpaceFolders(userid:string, spaceId: string) {
	if (!userid) throw new UserNotFound();
	if (!spaceId) throw new ClickUpSpaceIdNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getAllClickUpFolders(user.clickUpToken, spaceId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
};

// Get Folders Lists
async function getFoldersLists(userid:string, spaceId: string) {
	if (!userid) throw new UserNotFound();
	if (!spaceId) throw new ClickUpSpaceIdNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getAllClickUpLists(user.clickUpToken, spaceId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Synchronize Tasks
async function syncUserTask(projectId:string, taskId: string) {
	if (!projectId) throw new ClickUpTaskIdNotProvided();
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	
	const result = await syncTaskToClickUp(projectId, taskId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Create Task
async function createTask(listId: string, userid: string, taskData: any) {
	if (!userid) throw new UserNotFound();
	if (!taskData || Object.keys(taskData).length === 0) throw new ClickUpTaskDataNotProvided();
	if (!listId) throw new ClickUpTaskDataNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await createClickUpTask(listId, taskData, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Update Task
async function updateTask(taskId: string, updateData: any, userid: string) {
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	if (!userid) throw new UserNotFound();
	if (!updateData || Object.keys(updateData).length === 0) throw new ClickUpTaskDataNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await updateClickUpTask(taskId, updateData, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Update Task Status
async function updateTaskStatus(userid: string, taskId: string, status: string) {
	if (!userid) throw new UserNotFound();
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	if (!status) throw new ClickUpStatusNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await updateTaskStatusInClickUp(user.clickUpToken, taskId, status);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Delete a task
async function deleteTask(taskId: string, userid: string) {
	if (!userid) throw new UserNotFound();
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await deleteClickUpTask(taskId, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Get Info from a List
async function getUserClickUpInfo(listId: string, userid: string) {
	if (!userid) throw new UserNotFound();
	
	const user = (await User.findById(userid)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getClickUpInfo(listId, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Setup Client Structure: Get Dev Folder 

export default {
	getUserWorkspaceSpaces,
	getSpaceFolders,
	getFoldersLists,
	syncUserTask,
	createTask,
	updateTask,
	deleteTask,
	updateTaskStatus,
	getUserClickUpInfo
}