import Task, { taskInterface } from "../../models/task";
import { Request, Response } from "express";
import { mailInterface, mailType, sendMail } from "../../utils/mailer";
import { userInterface } from "../../models/user";
import userController from "../user/userController";

export async function handleClickUpWebhook(req: Request, res: Response) {
	const event = req.body.event;
	const payload = req.body;

	try {
		if (event === "taskStatusUpdated") {
			const clickUpTaskId = payload.task_id;

			const statusChange = payload.history_items?.find(
				(item: any) => item.field === "status"
			);

			const newStatus = statusChange?.after?.status || payload.task?.status?.status;

			if (clickUpTaskId && newStatus) {
				await Task.findOneAndUpdate(
					{ clickUpTaskId },
					{ status: newStatus },
					{ new: true }
				);
			} else {
				console.log("Not enough data to update task status");
			}
		}

		if (event === "taskCommentPosted") {
			const clickUpTaskId = payload.task_id;
			const comment = payload.history_items?.[0]?.comment || payload.comment;

			if (clickUpTaskId && comment) {
				const author = comment.user?.username || comment.user?.name || "ClickUp User";
				const text = comment.text_content?.trim();
				const parsedDate = comment.date ? new Date(Number(comment.date)) : new Date();;

				if (text && !isNaN(parsedDate.getTime())) {
					await Task.findOneAndUpdate(
						{ clickUpTaskId },
						{
							$push: {
								comments: {
									author,
									comment: text,
									date: parsedDate
								}
							}
						},
						{ new: true }
					);

					sendEmailToUserThatCreatedTheTask(clickUpTaskId,text);
				} else {
					console.warn("Ignored comment without author, text, or date:", {
						author,
						comment: text,
						date: parsedDate
					});
				}
			} else {
				console.log("Not enough data to update task comment");
			}
		}

		res.status(200).send("OK");
	} catch (err) {
		console.error("Error al procesar el webhook:", err);
		res.status(500).send("Internal Server Error");
	}
}

async function sendEmailToUserThatCreatedTheTask(clickUpTaskId: string, text: string) {
	const task: taskInterface = await (Task.findOne({ clickUpTaskId })) as taskInterface;
	const user: userInterface =
		await userController.getUserById(task.requester.toString()) as userInterface;

	sendMail(user.name, user.email,
		"New Comment in your task", text, mailType.comment);
}