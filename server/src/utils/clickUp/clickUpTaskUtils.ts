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

// Type 0 = text
const REQUIRED_FIELDS = [
	{ name: "Device", type: 0},
	{ name: "Browser", type: 0},
	{ name: "Page", type: 0},
	{ name: "Requester", type: 0},
];

// Function to check if all custom fields are present and create them if not
export async function ensureCustomFields(listId: string, token:string) {
	const apiBase = `https://api.clickup.com/api/v2/list/${listId}`;

	// Get existing custom fields
	const existingFieldsRes = await axios.get(`${apiBase}/field`, {
		headers: {
			Authorization: token,
		}
	});

	const existingFields = existingFieldsRes.data.fields;
	const result: Record<string, string> = {};

	// Check if all custom fields are present and create them if not
	for (const field of REQUIRED_FIELDS) {
		const existing = existingFields.find((f: any) => f.name === field.name);
		if (!existing) {
			result[field.name] = existing.id;
		} else {
			// Create custom field if it doesn't exit
			const createRes = await axios.post(
				"https://api.clickup.com/api/v2/custom_field",
				{
					name: field.name,
					type: field.type,
					required: false,
					list_id: listId
				},
				{
					headers: {
						Authorization: token,
					}
				}
			);
			result[field.name] = createRes.data.id;
		}
	}
	return result;
}