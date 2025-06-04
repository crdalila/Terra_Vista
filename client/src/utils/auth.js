import FetchData from "./fetch.js";


async function login(email, password) {
    if (!email) return { error: "Not valid email" };
    if (!password) return { error: "Please introduce the password" };

    const data = { email, password };
    const result = await FetchData("/login", "POST", data);

    return result;
}

async function register(email, password) {
    if (!email || !email.includes("@")) {
        return { error: "Not valid email" };
    }
    if (!password) {
        return { error: "Please introduce the password" };
    }

    const data = {
        email,
        password,
    }

    const result = await FetchData("/register", "POST", data);
    return result;
}



async function logout() {
    const result = await FetchData("/logout", "POST");
    return result;
}

export {
    login,
    register,
    logout
}