import fetchData from "./fetch";

export async function getClickUpSpaces(userId) {
    const result = await fetchData(`/clickUp/spaces/${userId}`, "GET");
    return result;
}

export async function sendFeedback(userId, feedback) {
    const result = await fetchData(`/clickUp/sync/${userId}`, "POST", feedback);
    return result;
}

export async function sendCommentToClickUp(clickUpTaskId, comment) {
    const token = import.meta.env.VITE_CLICKUP_API_KEY;

    const response = await fetch(`https://api.clickup.com/api/v2/task/${clickUpTaskId}/comment`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment_text: comment
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.err || "Failed to send comment to ClickUp");
    }

    const data = await response.json();
    return data;
}
