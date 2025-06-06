import fetchData from "./fetch";

async function getUserProjects(userId) {
    const result = await fetchData(`/user/projects/${userId}`, "GET");
    return result;
}

async function getProjectId(projectId) {
    const result = await fetchData(`/project/${projectId}`, "GET");
    return result;
}

export default {
    getUserProjects,
    getProjectId
};
