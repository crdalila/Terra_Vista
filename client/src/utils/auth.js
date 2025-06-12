import FetchData from "./fetch.js";


async function login(email, password) {
    if (!email) return { error: "Not valid email" };
    if (!password) return { error: "Please introduce the password" };

    const data = { email, password };
    const result = await FetchData("/login", "POST", data);

	if (result?.error) {
		return {error: result.message || "Invalid credentials"};
	}

    return result;
}

async function register(email, password) {
    // if (!email || !email.includes("@")) {
    //     return { error: "Not valid email" };
    // }
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

async function firstLogin(email, temporalPassword, password) {
    if (!email || !email.includes("@")) {
        return { error: "Not valid email" };
    }
    if (!password || !temporalPassword) {
        return { error: "Please introduce the password" };
    }

    const data = {
        email,
        password,
        temporalPassword,
    }

    const result = await FetchData("/firstLogin", "POST", data);
    console.log("First Login Result",result);
    return result;
}



async function logout() {
    const result = await FetchData("/logout", "POST");
    return result;
}

export {
    login,
    register,
    firstLogin,
    logout
}