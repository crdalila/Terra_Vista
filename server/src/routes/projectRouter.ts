//===============================================================================
// name: userRouter.ts
// desc: routers of user related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import projectController from "../controllers/project/projectApiController.ts";
import { verifyToken } from "../utils/token.ts";
import verifyRole from "../utils/middlewares/roleMiddleware.ts";
import { verifyUserHasProject } from "../utils/middlewares/sameUserMiddleware.ts"
import { upload } from "../utils/middlewares/multerMiddleware.ts";
//===============================================================================

const router = Router();

router.get("/", verifyToken, verifyRole, projectController.getAllProjects);
router.get("/notif", verifyToken, verifyRole, projectController.getAllProjectsNotifs);
router.get("/tasks/:id", verifyToken, verifyUserHasProject, projectController.getProjectTasks);
router.get("/notif/:id", verifyToken, verifyUserHasProject, projectController.getProjectNotifsById);
router.get("/:id", verifyToken, verifyUserHasProject, projectController.getProjectById);

router.post("/create", verifyToken, verifyRole, projectController.createProject);
router.post("/tasks/:id", verifyToken,verifyUserHasProject,upload.single("screenshots"), projectController.createTaskIntoProject);

router.put("/tasks/:projectId/:taskId", verifyToken, verifyUserHasProject,upload.single("screenshots"),projectController.editTaskFromProject);
router.put("/finalize/:id", verifyToken,verifyUserHasProject, projectController.finalizeProject);
router.put("/:id", verifyToken, verifyRole, projectController.editProject);

router.delete("/tasks/:projectId/:taskId", verifyToken, verifyUserHasProject,projectController.deleteTaskFromProject);
router.delete("/:id", verifyToken, verifyRole, projectController.removeProject);


export default router;