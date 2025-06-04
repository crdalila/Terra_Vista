import axios from "axios";

// Fetches all ClickUp workspaces associated with the given token.
export const getClickUpWorkspaces = async (token: string) => {
    try {
        const response = await axios.get(
            `https://api.clickup.com/api/v2/team`,
            {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
        );
        return { success: true, data: response.data };
    } catch (error: any) {
        return { 
            success: false, 
            error: error.response?.data || error.message};
    }
}

// Fetches all ClickUp spaces associated with the given workspace ID and token.
export const getClickUpSpaces = async (workspaceId: string, token: string) => {
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/team/${workspaceId}/space`,
      { headers: { Authorization: token } }
    );
    return { success: true, data: response.data.spaces };
  } catch (error: any) {
    return { success: false, error: error.response?.data || error.message };
  }
};

// Get all list of a Project Manager
export const getAllClickUpLists = async (token: string) => {
    try {
        const response = await axios.get(
            `https://api.clickup.com/api/v2/list`,
            {
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
        );
        return { success: true, data: response.data };
    } catch (error: any) {
        return { 
            success: false, 
            error: error.response?.data || error.message};
    }
}

// Get Info from a list
export const getClickUpInfo = async (listId: string, token: string) => {
	try {
		const response = await axios.get(
			`https://api.clickup.com/api/v2/list/${listId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		return { success: true, data: response.data };
	} catch (error: any) {
		return { 
			success: false, 
			error: error.response?.data || error.message};
	}
}