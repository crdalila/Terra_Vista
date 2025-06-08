import Task from "../../models/task";
import { Request, Response } from "express";

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
				await Task.findOneAndUpdate(
					{ clickUpTaskId }, 
					{ 
						$push: { 
							comments: {
								author: comment.user?.username || comment.user?.name || "ClickUp User",
								comment: comment.comment_text || comment.text,
								date: comment.date ? new Date(comment.date) : new Date()
							}
						} 
					},
					{ new: true }
				);
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