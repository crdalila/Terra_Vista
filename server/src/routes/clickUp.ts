import express from "express";
import axios from "axios";

const router = express.Router();

// Create a new task in ClickUp
router.post("/create-task", async (req, res) => { 
	const { name, description, status } = req.body;
	try {
		const taskPayLoad: any = {
			name,
			description,
		}
		if (status) {
			taskPayLoad.status = status
		}

		const response = await axios.post(
			`https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`,
			taskPayLoad,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: process.env.CLICKUP_API_TOKEN,
				},
			}
		);
		res.status(201).json(response.data);
	} catch (error: any) {
		console.error("Error creating task:", error.response?.data || error.message);
		res.status(500).json({ error: "Failed to create task" });
	}
});

export default router;