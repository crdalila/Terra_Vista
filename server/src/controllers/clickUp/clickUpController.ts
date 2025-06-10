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
	getDevFolderQAList,
} from "../../utils/clickUp/clickUpProjectUtils";

import {
	createClickUpTask,
	updateClickUpTask,
	deleteClickUpTask,
} from "../../utils/clickUp/clickUpTaskUtils";

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
async function getUserWorkspaceSpaces(userId:string) {
	if (!userId) throw new UserNotFound();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) {
		throw new UserNotFound();
	}
	console.log("✅ User found:", user.email);
	if (!user.clickUpToken) {
		throw new ClickUpTokenNotProvided();
	}
	if (!user.clickUpWorkspaceId) {
		throw new Error("Missing ClickUp workspaceId");
	}
	
	const result = await getClickUpSpaces(user.clickUpWorkspaceId, user.clickUpToken);
	if (!result.success) {
		throw new ClickUpAPIError();
	}
	
	return result.data;
};

// Ensure Dev Folder and QA List exist
async function ensureDevFolderQAList(userId:string, spaceId: string) {
	if (!userId) throw new UserNotFound();
	if (!spaceId) throw new ClickUpSpaceIdNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getDevFolderQAList(user.clickUpToken, spaceId);
	
	return result;
}

// Get Space Folders
async function getSpaceFolders(userId:string, spaceId: string) {
	if (!userId) throw new UserNotFound();
	if (!spaceId) throw new ClickUpSpaceIdNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getAllClickUpFolders(user.clickUpToken, spaceId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
};

// Get Folders Lists
async function getFoldersLists(userId:string, spaceId: string) {
	if (!userId) throw new UserNotFound();
	if (!spaceId) throw new ClickUpSpaceIdNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getAllClickUpLists(user.clickUpToken, spaceId);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
};

// Create Task
async function createTask(listId: string, userId: string, taskData: any) {
	if (!userId) throw new UserNotFound();
	if (!taskData || Object.keys(taskData).length === 0) throw new ClickUpTaskDataNotProvided();
	if (!listId) throw new ClickUpTaskDataNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await createClickUpTask(listId, taskData, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Update Task
async function updateTask(taskId: string, updateData: any, userId: string) {
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	if (!userId) throw new UserNotFound();
	if (!updateData || Object.keys(updateData).length === 0) throw new ClickUpTaskDataNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await updateClickUpTask(taskId, updateData, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}
/*
// Update Task Status
async function updateTaskStatus(userId: string, taskId: string, status: string) {
	if (!userId) throw new UserNotFound();
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	if (!status) throw new ClickUpStatusNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await updateTaskStatusInClickUp(user.clickUpToken, taskId, status);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}*/

// Delete a task
async function deleteTask(taskId: string, userId: string) {
	if (!userId) throw new UserNotFound();
	if (!taskId) throw new ClickUpTaskIdNotProvided();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await deleteClickUpTask(taskId, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}

// Get Info from a List
async function getUserClickUpInfo(listId: string, userId: string) {
	if (!userId) throw new UserNotFound();
	
	const user = (await User.findById(userId)) as userInterface || null;
	if (!user) throw new UserNotFound();
	if (!user.clickUpToken) throw new ClickUpTokenNotProvided();
	
	const result = await getClickUpInfo(listId, user.clickUpToken);
	if (!result.success) throw new ClickUpAPIError();
	
	return result.data;
}
// Send comment to ClickUp
async function sendCommentToClickUp(taskId: string, comment: string) {
    const token = process.env.CLICKUP_API_KEY;

    const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/comment`, {
        method: 'POST',
        headers: {
            'Authorization': token || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_text: comment }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.err || 'Failed to send comment to ClickUp');
    }

    return data;
}

export default {
	sendCommentToClickUp,
	getUserWorkspaceSpaces,
	ensureDevFolderQAList,
	getSpaceFolders,
	getFoldersLists,
	createTask,
	updateTask,
	deleteTask,
	//updateTaskStatus,
	getUserClickUpInfo
}