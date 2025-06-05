//===============================================================================
// name: userRouter.ts
// desc: routers of user related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import projectController from "../controllers/project/projectApiController.ts";
import { verifyToken } from "../utils/token.ts";
//===============================================================================

const router = Router();

//NEED TO MAKE MIDDLEWARE TO CHECK IF USER ID IS THE SAME AS THE
//USER YOU WANT TO INTERACT WITH OR THE ADMIN

router.get("/", verifyToken, projectController.getAllProjects);
router.get("/tasks/:id", verifyToken, projectController.getProjectTasks);
router.get("/:id", verifyToken, projectController.getProjectById);

router.post("/create", verifyToken, projectController.createProject);
router.post("/project/:projectId/:taskId", verifyToken, projectController.createTaskIntoProject);

router.put("/project/:projectId/:taskId", verifyToken, projectController.editTaskFromProject);
router.put("/finalize/:id", verifyToken, projectController.finalizeProject);
router.put("/:id", verifyToken, projectController.editProject);

router.delete("/project/:projectId/:taskId", verifyToken, projectController.deleteTaskFromProject);
router.delete("/:id", verifyToken, projectController.removeProject);


export default router;