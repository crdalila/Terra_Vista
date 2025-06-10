import fetchData from "./fetch";

export async function getClickUpSpaces(userId) {
    const result = await fetchData(`/clickUp/spaces/${userId}`, "GET");
    return result;
}

export async function sendFeedback(userId, feedback) {
    const result = await fetchData(`/clickUp/sync/${userId}`, "POST", feedback);
    return result;
}

export async function sendCommentToClickUp(taskId, comment) {
    const result = await fetchData(`/clickUp/comment/${taskId}`, "POST", { comment });
    return result;
}

