import fetchData from "./fetch";

async function getUserById() {
    const result = await fetchData("/user/:id", "GET");
    return result;
}

async function getAllUsers() {
    const result = await fetchData("/user", "GET");
    return result;
}

export async function getUserAllProjects(userId) {
    const result = await fetchData(`/user/projects/${userId}`, "GET");
    return result;
}

async function addUserToProject(userId, projectId) {
    const result = await fetchData(`/user/project/${userId}/${projectId}`, "PUT");
    return result;
}

async function createUser(user) {
    const result = await fetchData("/register", "POST", user);
    return result;
}


async function updateUser(updateData) {
	const data = {
		username: updateData.username,
		email: updateData.email,
	}
	if (updateData.password && updateData.password.trim() !== "") {
		data.password = updateData.password;
	}
	const result = await fetchData("/user/:id", "PUT", data);
	return result;
}

async function changeUserPassword({ oldPassword, newPassword, userId }) {
    if (!oldPassword || !newPassword || !userId) {
        return { error: "Missing data" };
    }
    
	const data = {
		currentPassword: oldPassword,
		newPassword: newPassword,
        confirmPassword: newPassword
	};

	const result = await fetchData(`/user/password/${userId}`, "PUT", data);
	return result;
}


async function removeUser(userId) {
    const result = await fetchData(`/user/${userId}`, "DELETE");
    return result;
}


export default {
    getUserAllProjects,
    getAllUsers,
    createUser,
    addUserToProject,
    updateUser,
    getUserById,
    changeUserPassword,
    removeUser,
}