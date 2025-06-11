import Task from "../../models/task";
import User from "../../models/user";
import Project, { projectInterface } from "../../models/project";
import axios from "axios";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import { ensureCustomFields } from "../../utils/clickUp/clickUpTaskUtils";
import { UserNotFound, ClickUpListIdNotProvided } from "../../utils/errors/clickUpError";
import { getDevFolderQAList } from "../../utils/clickUp/clickUpProjectUtils";
import { ProjectDoesNotExist } from "../../utils/errors/projectError";

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

		const priorityMap: Record<string, number> = {
			"Low": 1,
			"Medium": 2,
			"High": 3,
			"Urgent": 4
		};

		// Save enriched fields
		task.requestType = category.data.Category;
		task.priority = priorityMap[priority.data.Priority];
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
	console.log("token", token);
	const project = user.projects[0] as unknown as projectInterface;

	if (!project || !project.clickUpListId) {
		console.error("user has no project")
		throw new ClickUpListIdNotProvided();
	}

	const listId = project.clickUpListId;

	const pendingTasks = await Task.find({ requester: userId, isSend: false });
	console.log("Pending tasks to sync:", pendingTasks.length);
	if (pendingTasks.length === 0) {
		return { success: true, message: "No pending tasks to sync" };
	}
	const results = [];

	let customFieldMap;

	try {
		customFieldMap = await ensureCustomFields(String(listId), token);
		console.log("Custom field map:", customFieldMap);
		console.log("Custom fields loaded:", Object.keys(customFieldMap));
	} catch (err: any) {
		console.error("Error loading custom fields:", err.message);
		throw err; 
	}

	for (const task of pendingTasks) {
		try {
			// Enrich task data
			await enrichTaskData(task);

			const requesterUser = await User.findById(task.requester);
			const requesterMail = requesterUser?.email || "unknown";

			const payload = {
				name: task.name, 
				description: task.request,
				tags: [task.requestType],
				time_estimate: Number(task.estimateTime) * 60 * 100000,
				status: "With Feedback",
				start_date: Date.now(),
				priority: task.priority,
				custom_fields: [
					{ id: customFieldMap.Device, value: task.device },
					{ id: customFieldMap.Browser, value: task.browser },
					{ id: customFieldMap.Page, value: task.page },
					{ id: customFieldMap.Requester, value: requesterMail }
				]
			};
			console.log("Payload enviado a ClickUp:", payload);


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

			console.log(`Task created in ClickUp: ${response.data.id}`);

			const clickUpTaskId = response.data.id;

			task.isSend = true;
			task.clickUpTaskId = clickUpTaskId;

			if (task.screenshots) {
				const imagePath = path.join(process.cwd(), 'public', 'images', String(task.screenshots));
				const fileStream = fs.createReadStream(imagePath);

				const formData = new FormData();
				formData.append("attachment", fileStream, String(task.screenshots));

				await axios.post(
					`https://api.clickup.com/api/v2/task/${clickUpTaskId}/attachment`,
					formData,
					{
						headers: {
							...formData.getHeaders(),
							Authorization: token,
						}
					}
				);
			}

			await task.save();

			results.push({ taskId: task._id, clickUpTaskId: response.data.id });
		} catch (err: any) {
			//console.error(`Error syncing task ${task._id}: ${err.message}`);
			console.error(err);
			results.push({ taskId: task._id, success: false, error: err.message });
		}
	}
	const projectId = (user.projects[0] as any)._id;
	await notifyOfTasksSend(projectId, pendingTasks.length);
	return { success: true, synced: results };
}

async function notifyOfTasksSend(projectId : string, howManyTasks : number) {
	const project = await Project.findById(projectId);
	if(!project) throw new ProjectDoesNotExist;
	project.notifications.push(`${howManyTasks} tasks has been send at ${Date.now()}`);
	project.save();
}


export default syncPendingTasks;