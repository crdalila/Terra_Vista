import axios from "axios";

const CLICKUP_API_KEY = process.env.CLICKUP_API_TOKEN;
const WEBHOOK_BASE_URL = process.env.WEBHOOK_BASE_URL;
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID;

export async function createClickUpWebhook(clickUpListId: string): Promise<string> {
	if (!CLICKUP_TEAM_ID) {
		throw new Error("CLICKUP_TEAM_ID is required for webhook creation");
	}
	const endpoint = `${WEBHOOK_BASE_URL}/clickUp/webhook`;

	const body = {
		endpoint,
		events: ["taskStatusUpdated", "taskCommentPosted"],
		list_id: clickUpListId,
		custom_task_ids: false,
		task_id: null,
	};

	try {
		const webhookUrl = `https://api.clickup.com/api/v2/team/${CLICKUP_TEAM_ID}/webhook`;

		console.log("🌍 POST a ClickUp webhook:", webhookUrl);
		console.log("Payload:", JSON.stringify(body, null, 2));
		console.log("Token:", CLICKUP_API_KEY ? 'Presente' : 'FALTA TOKEN');
		console.log("🏢 Team ID:", CLICKUP_TEAM_ID);
		
		const response = await axios.post(
			webhookUrl,
			body,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: CLICKUP_API_KEY,
				}
			}
		);
		
		console.log("Webhook created", response.data.id);
		return response.data.id;
	} catch (error: any) {
		console.error("❌ Error creating webhook:");
		console.error("Status:", error.response?.status);
		console.error("Data:", error.response?.data);
		console.error("Headers:", error.response?.headers);
		throw new Error(`Webhook creation failed: ${error.response?.data?.err || error.message}`);
	}
}