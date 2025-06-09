import fetchData from "./fetch";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

async function getTasks(projectId) {
    const result = await fetchData(`/project/tasks/${projectId}`, "GET");
    return result;
}

async function createTask(projectId, taskData) {
    const result = await fetchData(`/project/tasks/${projectId}`, "POST", taskData);
    return result;
}

async function createTaskWithImage(projectId, taskData, image) {
	const formData = new FormData();
	for (const key in taskData) {
		formData.append(key, taskData[key]);
	}

	if (image) {
		formData.append("picture", image);
	}

	const response = await fetch(`${BASE_URL}/project/tasks/${projectId}`, {
		method: "POST",
		body: formData,
		credentials: "include",
	})

	const rawText = await response.text();
	let responseData;
	
	try {
		responseData = JSON.parse(rawText);
	} catch {
		responseData = rawText;
	}

	if (!response.ok) {
		throw new Error(responseData.message || "Failed to create task");
	}

	return responseData;
}

async function editTask(projectId, taskId, taskData) {
    const result = await fetchData(`/project/tasks/${projectId}/${taskId}`, "PUT", taskData);
    return result;
}

async function removeTask(projectId, taskId) {
    const result = await fetchData(`/project/tasks/${projectId}/${taskId}`, "DELETE");
    return result;
}

export default {
    getTasks,
    createTask,
	createTaskWithImage,
    editTask,
    removeTask
}