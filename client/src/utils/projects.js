import fetchData from "./fetch";

async function getAllProjects() {
	const result = await fetchData("/project", "GET");
	return result;
}

async function getUserProjects(userId) {
    const result = await fetchData(`/user/projects/${userId}`, "GET");
    return result;
}

async function getProjectId(projectId) {
    const result = await fetchData(`/project/${projectId}`, "GET");
    return result;
}

async function createProject(body) {
    const result = await fetchData(`/project/create`, "POST", body);
    return result;
}

async function deleteProject(projectId) {
    const result = await fetchData(`/project/${projectId}`, "DELETE");
    return result;
}

export default {
	getAllProjects,
    getUserProjects,
    getProjectId,
    createProject, 
    deleteProject
};
