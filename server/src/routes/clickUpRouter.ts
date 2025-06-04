import express from "express";
import clickUpApiController from "../controllers/clickUp/clickUpApiController";

const router = express.Router();

// Get spaces for a user
router.get("/spaces/:userid/:workspaceid", clickUpApiController.getSpaces);

// Get folders for a space
router.get("/folders/:userid/:spaceid", clickUpApiController.getFolders);

// Get lists for a space
router.get("/lists/:userid/:spaceid", clickUpApiController.getLists);

// Get info from a list
router.get("/info/:userid/:listId", clickUpApiController.getClickUpInfo);

// Create task
router.post("/create/:userid/:listId", clickUpApiController.createTask);

// Update task
router.put("/update/:userid/:taskId", clickUpApiController.updateTask);

// Delete task
router.delete("/delete/:userid/:taskId", clickUpApiController.deleteTask);

// Update task status
router.put("/status/:userid/:taskid", clickUpApiController.updateTaskStatus);

// Sync task
router.post("/sync/:userid", clickUpApiController.syncTask);

export default router;
