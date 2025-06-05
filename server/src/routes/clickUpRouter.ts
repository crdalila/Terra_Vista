import express from "express";
import clickUpApiController from "../controllers/clickUp/clickUpApiController";

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

// Update task status
router.put("/status/:userId/:taskId", clickUpApiController.updateTaskStatus);

// Sync task
router.post("/sync/:userId", clickUpApiController.syncTask);

export default router;
