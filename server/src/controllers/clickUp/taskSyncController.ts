import Task from "../../models/task";
import User from "../../models/user";
import { projectInterface } from "../../models/project";
import axios from "axios";
import { ensureCustomFields } from "../../utils/clickUp/clickUpTaskUtils";
import { UserNotFound, ClickUpListIdNotProvided } from "../../utils/errors/clickUpError";
import { getDevFolderQAList } from "../../utils/clickUp/clickUpProjectUtils";

// Use Data API
async function enrichTaskData(task: any) {
	const baseUrl = "http://ml-api:5000/v1";
	const text = encodeURIComponent(task.request);

	try {
		const [category, priority, duration] = await Promise.all([
			axios.get(`${baseUrl}/predictCategory?request_text=${text}`),
			axios.get(`${baseUrl}/predictPriority?request_text=${text}`),
			axios.get(`${baseUrl}/predictDuration?request_text=${text}`)
		]);

		// Save enriched fields
		task.requestType = category.data.Category;
		task.priority = priority.data.Priority;
		task.estimateTime = Math.round(duration.data.Duration);

		await task.save(); // Save the updated task in MongoDB

		return {
			...task.toObject(),
			requestType: task.requestType,
			priority: task.priority,
			estimateTime: task.estimateTime
		};
	} catch (err: any) {
		console.error("Error enriching the task", err.message);
		throw new Error("Failed to query the prediction API")
	}
};

async function syncPendingTasks(userId: string) {
	const user = await User.findById(userId).populate("projects");
	if (!user || !user.clickUpToken) {
		throw new UserNotFound();
	}

	const token = user.clickUpToken;
	const project = user.projects[0] as unknown as projectInterface;

	if (!project || !project.clickUpListId) {
		throw new ClickUpListIdNotProvided();
	}

	const listId = project.clickUpListId;

	const pendingTasks = await Task.find({ requester: userId, isSend: false });
	if (pendingTasks.length === 0) {
		return { success: true, message: "No pending tasks to sync" };
	}

	const customFieldMap = await ensureCustomFields(String(listId), token);
	const results = [];

	for (const task of pendingTasks) {
		try {
			// Enrich task data
			await enrichTaskData(task);

			const payload = {
				name: task.name, 
				description: task.request,
				tags: [task.requestType],
				time_estimate: Number(task.estimateTime) * 60 * 1000, // Convert to milliseconds
				status: "With Feedback",
				custom_fields: [
					{ id: customFieldMap.Device, value: task.device },
					{ id: customFieldMap.Browser, value: task.browser },
					{ id: customFieldMap.Page, value: task.page },
					{ id: customFieldMap.Requester, value: task.requester }
				]
			};

			const response = await axios.post(
				`https://api.clickup.com/api/v2/list/${listId}/task`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					}
				}
			);

			task.isSend = true;
			task.clickUpTaskId = response.data.id;
			await task.save();

			results.push({ taskId: task._id, clickUpTaskId: response.data.id });
		} catch (err: any) {
			console.error(`Error syncing task ${task._id}: ${err.message}`);
			results.push({ taskId: task._id, success: false, error: err.message });
		}
	}
	return { success: true, synced: results };
}


export default syncPendingTasks;