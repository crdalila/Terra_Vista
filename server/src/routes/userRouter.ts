//===============================================================================
// name: userRouter.ts
// desc: routers of user related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import userController from "../controllers/user/userApiController.ts";
import { verifyToken } from "../utils/token.ts";
import verifyRole from "../utils/middlewares/roleMiddleware.ts";
import verifyUser from "../utils/middlewares/sameUserMiddleware.ts";
//===============================================================================

const router = Router();

router.get("/", verifyToken, verifyRole, userController.getAllUsers); // A & PM
router.get("/projects/:id", verifyToken, verifyUser, userController.getUserProjects); // U
router.get("/cookieUser", verifyToken, userController.getUserByCookie);
router.get("/:id", verifyToken, verifyUser, userController.getUserById); // U

router.put("/password/:id", verifyToken, verifyUser, userController.editUserPassword); // A & PM 
router.put("/project/:userId/:projectId", verifyToken, verifyRole, userController.addProjectToUser); // A & PM
router.put("/:id", verifyToken, verifyRole, userController.editUser); // A

router.delete("/project/:userId/:projectId", verifyToken, verifyRole, userController.removeProjectToUser); // A & PM
router.delete("/:id", verifyToken, verifyRole, userController.removeUser); // A

export default router;