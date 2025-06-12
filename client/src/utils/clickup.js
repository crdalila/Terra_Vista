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
    const result = await fetchData(`/clickUp/comment/${clickUpTaskId}`, "POST", comment);
    return result;
}


// Upload image to task in clickUp
export async function uploadImageToTask(taskId, imageFile) {
	if (!taskId || !imageFile) {
		throw new Error ("There aren't enought data to sent the image")
	}

	const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
	const MAX_SIZE_MB = 5;

	if (!ALLOWED_TYPES.includes(imageFile.type)) {
		throw new Error("Only JPG, JPEG, PNG and WEBP images are allowed.");
	}

	if (imageFile.size > MAX_SIZE_MB * 1024 * 1024) {
		throw new Error("File too large. Maximum allowed size is 10 MB.");
	}

	const formData = new FormData();
	formData.append("attachment", imageFile);

	console.log("Sending to:", `https://api.clickup.com/api/v2/task/${taskId}/attachment`);

	const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}/attachment`, {
		method: "POST",
		headers: {
			Authorization: import.meta.env.VITE_CLICKUP_TOKEN,
		},
		body: formData,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.err || "Error loading the image");
	}

	return data;
}
