import { createClickUpTask, updateClickUpTask } from "./clickUpTaskUtils";
import Project from "../../models/project";
import User from "../../models/user";
import project from "../../models/project";

// Build the Object to be sent to the API
const buildClickUpTaskPayload = (task: any): Record<string, any> => {
	const payload: Record<string, any> = {
		name: task.name,
		description: task.description,
		status: task.status,
		priority: task.priority,
		inputDate: task.inputDate,
		estimateTime: task.estimateTime,
		requester: task.requester,
		device: task.device,
		browser: task.browser,
		request: task.request,
		page: task.page,
		screenshots: task.screenshots
	}
	return payload;
}
/*
export const syncTaskToClickUp = async (projectId: string, taskId: string) => {
	try {
		const project = await Project.findById(projectId);
		if (!project) {
			return { success: false, error: "Project not found" };
		}
		const task = project.tasks?.(taskId);
		if (!task) {
			return { success: false, error: "Task not found" };
		}
		const projectManager = await User.findById(user.role === "projectManager" ? user._id : null);
		if (!projectManager) {
			return { success: false, error: "Project manager not found" };
		}
		const clickUpTaskData = buildClickUpTaskPayload(task);
		const result = await createClickUpTask(project.clickUpListId, clickUpTaskData, projectManager.clickUpToken);
		
		if (result.success) {
			task.clickUpTaskId = result.data.id;
			task.syncedToClickUp = true;
			task.clickUpUrl = result.data.url;
			await project.save();

			return { success: true, data: result.data };
		} else {
			return { success: false, error: result.error };
		}
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}

export const updateTaskStatusInClickUp = async (projectId: string, taskId: string, status: string) => {
	try {
		const project = await Project.findById(projectId).populate("projectManager");
		if (!project) {
			return { success: false, error: "Project not found" };
		}
		const task = project.tasks?.id(taskId);
		if (!task) {
			return { success: false, error: "Task not found" };
		}
		const projectManager = await User.findById(project?.projectManager);
		if (!projectManager) {
			return { success: false, error: "Project manager not found" };
		}
		if (!projectManager.clickUpToken || !task.clickUpTaskId) {
			return { success: false, error: "Missing ClickUp configuration" };
		}
		const updateData = {
			status: task.status,
			priority: task.priority,
		};
		return await updateClickUpTask(task.clickUpTaskId, updateData, projectManager.clickUpToken);
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}*/