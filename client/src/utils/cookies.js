import fetchData from "./fetch";

async function getUserByCookies() {
    const result = await fetchData(`/user/cookieUser`, "GET");
    return result;
}

export default getUserByCookies;