import fetchData from "./fetch";

async function getUserById(userId) {
    const result = await fetchData(`/user/${userId}`, "GET");
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

async function removeUserFromProject(userId, projectId) {
    const result = await fetchData(`/user/project/${userId}/${projectId}`, "DELETE");
    return result;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generatePassword() {
    let newPassword = "";
    let lowers = "qwertyuiopasdfghjklzxcvbnm".split();
    let uppers = "qwertyuiopasdfghjklzxcvbnm".toUpperCase().split();
    let numbers = "1234567890".split();
    let symbols = "!@#$%^&*".split();

    for (let i = 0; i < 2; i++) {
        newPassword += lowers[getRandomArbitrary(0, lowers.length - 1)];
        newPassword += uppers[getRandomArbitrary(0, uppers.length - 1)];
        newPassword += numbers[getRandomArbitrary(0, numbers.length - 1)];
        newPassword += symbols[getRandomArbitrary(0, symbols.length - 1)];
    }
    newPassword = newPassword.split('').sort(() => { return 0.5 - Math.random() }).join('');
    return newPassword;
}

async function createUser(user) {
    let newPassword = generatePassword();
    console.log(newPassword);
    const result = await fetchData("/register", "POST",
        { name: user.name, email: user.email, role: user.role, password: newPassword });
    return result;
}


async function updateUser(userId, updateData) {
    const data = {
        username: updateData.username,
        email: updateData.email,
    }
    if (updateData.password && updateData.password.trim() !== "") {
        data.password = updateData.password;
    }
    const result = await fetchData(`/user/${userId}`, "PUT", data);
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
    removeUserFromProject,
}