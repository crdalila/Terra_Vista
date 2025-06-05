import fetchData from "./fetch";

async function getUserByCookies(cookie) {
    const result = await fetchData(`/user/${cookie}`, "GET");
    return result;
}

export default getUserByCookies;