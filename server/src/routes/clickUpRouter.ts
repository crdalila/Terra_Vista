import express from "express";
import { Request, Response } from "express";
import {
	getClickUpWorkspaces,
	getClickUpSpaces,
	getAllClickUpLists,
	getClickUpInfo
} from "../utils/clickUp/clickUpProjectUtils";

import {
	syncTaskToClickUp,
	updateTaskStatusInClickUp
} from "../utils/clickUp/taskSyncService";

import Project from "../models/project";
import User from "../models/user";
import { userInterface } from "../models/user";

const router = express.Router();

interface WorkspaceParams {
	userid: string;
}

router.get("/clickup/workspaces/:userid", async (req: Request<WorkspaceParams>, res: Response) => {
	try {
		const user = (await User.findById(req.params.userid)) as userInterface || null;
		if (!user || !user.clickUpToken) {
			return res.status(404).json({ success: false, error: "User not found" });
		}
		const result = await getClickUpWorkspaces(user.clickUpToken);
		if (result.success) {
			return res.status(200).json({ success: true, data: result.data });
		} else {
			return res.status(500).json({ success: false, error: result.error });
		}

	} catch (error: any) {
		console.error("Error fetching workspaces:", error);
		res.status(500).json({ error: "Failed to fetch workspaces" });
	}
});

export default router;