import fetchData from "./fetch";

export async function getClickUpSpaces(userId) {
    const result = await fetchData(`/clickUp/spaces/${userId}`, "GET");
    return result;
}