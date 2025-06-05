import fetchData from "./fetch";

async function getUserProjects(userId) {
    const result = await fetchData(`/user/projects/${userId}`, "GET");
    return result;
}

export default {
    getUserProjects
};
