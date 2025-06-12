import axios from "axios";
import { ClickUpAPIError } from "../errors/clickUpError";

// Get ClickUp workspace associated with the given token.
export const getClickUpWorkspace = async (token: string) => {
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
	console.log("Calling ClickUp API with workspaceId:", workspaceId);
    console.log("Using token (first 10 chars):", token.slice(0, 10));

    const response = await axios.get(
      `https://api.clickup.com/api/v2/team/${workspaceId}/space`,
      { headers: { Authorization: token } }
    );
    return { success: true, data: response.data.spaces };
  } catch (error: any) {
    return { success: false, error: error.response?.data || error.message };
  }
};

// Get all Folders of a Space
export const getAllClickUpFolders = async (token: string, spaceId: string) => {
	try {
		const response = await axios.get(
			`https://api.clickup.com/api/v2/space/${spaceId}/folder`,
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

// Get all list of a Folder
export const getAllClickUpLists = async (token: string, folderId: string) => {
    try {
        const response = await axios.get(
            `https://api.clickup.com/api/v2/folder/${folderId}/list`,
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

// Search Dev Folder and QA List
export const getDevFolderQAList = async (token: string, spaceId: string) => {
	// Get all folders
	const foldersResult = await getAllClickUpFolders(token, spaceId);
	console.log("Folders fetched:", foldersResult);
	if (!foldersResult.success) {
		console.error("Error fetching folders:", foldersResult.error);
		throw new ClickUpAPIError();

	}
	let devFolder = foldersResult.data.folders.find((folder: any) => folder.name === "Dev");

	// Create Dev Folder if it doesn't exist
	if (!devFolder) {
		const res = await axios.post(
			`https://api.clickup.com/api/v2/space/${spaceId}/folder`,
			{
				name: "Dev"
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		devFolder = res.data;
	};
	// Get list from Dev folder
	const listResult = await getAllClickUpLists(token, devFolder.id);
	if (!listResult.success) throw new Error ("Failed to get lists");

	let qaList = listResult.data.lists.find((list: any) => list.name === "QA");

	// Create QA List if it doesn't exist
	if (!qaList) {
		const res = await axios.post(
			`https://api.clickup.com/api/v2/folder/${devFolder.id}/list`,
			{
				name: "QA"
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				}
			}
		);
		qaList = res.data;
	};
	return {
		folderId: devFolder.id,
		listId: qaList.id
	};
}