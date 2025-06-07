import fetchData from "./fetch";

async function getTasks(projectId) {
    const result = await fetchData(`/project/tasks/${projectId}`, "GET");
    return result;
}

async function createTask(projectId, taskData) {
    const result = await fetchData(`/project/tasks/${projectId}`, "POST", taskData);
    return result;
}

export default {
    getTasks,
    createTask
}