//===============================================================================
// name: userRouter.ts
// desc: routers of user related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import projectController from "../controllers/project/projectApiController.ts";
import { verifyToken } from "../utils/token.ts";
import verifyRole from "../utils/middlewares/roleMiddleware.ts";
//===============================================================================

const router = Router();

router.get("/", verifyToken, verifyRole, projectController.getAllProjects);
router.get("/tasks/:id", verifyToken, projectController.getProjectTasks);
router.get("/:id", verifyToken, projectController.getProjectById);

router.post("/create", verifyToken, verifyRole, projectController.createProject);
router.post("/tasks/:id", verifyToken, projectController.createTaskIntoProject);

router.put("/tasks/:projectId/:taskId", verifyToken, projectController.editTaskFromProject);
router.put("/finalize/:id", verifyToken, projectController.finalizeProject);
router.put("/:id", verifyToken, verifyRole, projectController.editProject);

router.delete("/tasks/:projectId/:taskId", verifyToken, projectController.deleteTaskFromProject);
router.delete("/:id", verifyToken, verifyRole, projectController.removeProject);


export default router;