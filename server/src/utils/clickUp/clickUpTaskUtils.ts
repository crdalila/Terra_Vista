import axios from 'axios';
import { getClickUpInfo } from './clickUpProjectUtils';


// Get all tasks
export const getAllClickUpTasks = async (listId: string, token: string) => {
	try {
		const response = await axios.get(
			`https://api.clickup.com/api/v2/list/${listId}/task`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Create a new task
export const createClickUpTask = async (listId: string, taskData: any, token: string) => {
	try {
		const response = await axios.post(
			`https://api.clickup.com/api/v2/list/${listId}/task`,
			taskData,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Update a task
export const updateClickUpTask = async (taskId: string, updateData: any, token: string) => {
	try {
		const response = await axios.put(
			`https://api.clickup.com/api/v2/task/${taskId}`,
			updateData,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Delete a task
export const deleteClickUpTask = async (taskId: string, token: string) => {
	try {
		const response = await axios.delete(
			`https://api.clickup.com/api/v2/task/${taskId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Add task to list
export const addTaskToList = async (listId: string, taskId: string, token: string) => {
	try {
		const response = await axios.post(
			`https://api.clickup.com/api/v2/list/${listId}/task/${taskId}`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}



// Validate user access to a list
export const validateUserAccess = async (listId: string, token: string) => {
	try {
		const listInfo = await getClickUpInfo(listId, token);
		
		if (listInfo.success) {
			return { 
				success: true, 
				data: {
					id: listInfo.data.id,
					name: listInfo.data.name,
					space: listInfo.data.space,
					project: listInfo.data.project
				} 
			};
		}
		return listInfo;
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}