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
/*
// Update task status
router.put("/status/:userId/:taskId", clickUpApiController.updateTaskStatus);

// Sync task
router.post("/sync/:userId", clickUpApiController.syncTask);*/

// Get tasks not sent to clickUp
router.get("/pending/:userId", clickUpApiController.getPendingTasks);

// Prueba la API de data
// TODO Borrar
/*
async function enrichSingleTaskHandler(req: any, res: any) {
  try {
    const Task = (await import("../models/task")).default;
    const clickUpController = (await import("../controllers/clickUp/clickUpController")).default;
    
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const enriched = await clickUpController.enrichTaskData(task);
    res.status(200).json({ success: true, enriched });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Test the data API
router.get("/enrich/:taskId", enrichSingleTaskHandler);
*/
export default router;
