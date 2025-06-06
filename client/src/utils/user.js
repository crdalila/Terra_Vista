import fetchData from "./fetch";

async function getUserById() {
    const result = await fetchData("/user/:id", "GET");
    return result;
}

export async function getUserAllProjects(userId) {
    const result = await fetchData(`/user/projects/${userId}`, "GET");
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

async function editUserPassword() {
    const result = await fetchData("/user/password/:id", "PUT");
    return result;
}

async function removeUser() {
    const result = await fetchData("/user/:id", "DELETE");
    return result;
}

export default {
    updateUser,
    getUserById,
    editUserPassword,
    removeUser
}