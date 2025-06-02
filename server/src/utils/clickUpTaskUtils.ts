import axios from 'axios';

const clickUpApiConfig = {
	headers: {
		'Content-Type': 'application/json',
		Authorization: process.env.CLICKUP_API_TOKEN,
	},
};


// Get all tasks
export const getAllClickUpTasks = async (listId: string) => {
	try {
		const response = await axios.get(
			`https://api.clickup.com/api/v2/list/${listId}/task`,
			clickUpApiConfig
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Create a new task
export const createClickUpTask = async (listId: string, taskData: any) => {
	try {
		const response = await axios.post(
			`https://api.clickup.com/api/v2/list/${listId}/task`,
			taskData,
			clickUpApiConfig
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Update a task
export const updateClickUpTask = async (taskId: string, taskData: any) => {
	try {
		const response = await axios.put(
			`https://api.clickup.com/api/v2/task/${taskId}`,
			taskData,
			clickUpApiConfig

		//taskData
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Delete a task
export const deleteClickUpTask = async (taskId: string) => {
	try {
		const response = await axios.delete(
			`https://api.clickup.com/api/v2/task/${taskId}`,
			clickUpApiConfig
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

// Add task to list
export const addTaskToList = async (listId: string, taskId: string) => {
	try {
		const response = await axios.post(
			`https://api.clickup.com/api/v2/list/${listId}/task/${taskId}`,
			clickUpApiConfig
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}