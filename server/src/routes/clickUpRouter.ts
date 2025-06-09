import express from "express";
import clickUpApiController from "../controllers/clickUp/clickUpApiController";
import { handleClickUpWebhook } from "../controllers/clickUp/clickUpWebhookController";

const router = express.Router();

// Get spaces for a user
router.get("/spaces/:userId", clickUpApiController.getSpaces);

// Ensure Dev Folder and QA List exist
router.get("/ensureDevFolderQAList/:userId/:spaceId", clickUpApiController.ensureDevFolderQAList);

// Get folders for a space
router.get("/folders/:userId/:spaceId", clickUpApiController.getFolders);

// Get lists for a space
router.get("/lists/:userId/:spaceId", clickUpApiController.getLists);

// Get info from a list
router.get("/info/:userId/:listId", clickUpApiController.getClickUpInfo);

// Create task
router.post("/create/:userId/:listId", clickUpApiController.createTask);

// Update task
router.put("/update/:userId/:taskId", clickUpApiController.updateTask);

// Delete task
router.delete("/delete/:userId/:taskId", clickUpApiController.deleteTask);

// Update task status and comments from clickup
router.post("/webhook", handleClickUpWebhook);

// Sync task
router.post("/sync/:userId", clickUpApiController.syncPendingTasksHandler);

// Get tasks not sent to clickUp
router.get("/pending/:userId", clickUpApiController.getPendingTasks);


export default router;
