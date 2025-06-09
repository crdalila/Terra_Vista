import fetchData from "./fetch";

export async function getClickUpSpaces(userId) {
    const result = await fetchData(`/clickUp/spaces/${userId}`, "GET");
    return result;
}

export async function sendFeedback(userId, feedback) {
    const result = await fetchData(`/clickUp/sync/${userId}`, "POST", feedback);
    return result;
}
