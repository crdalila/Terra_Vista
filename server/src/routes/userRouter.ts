//===============================================================================
// name: userRouter.ts
// desc: routers of user related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import userController from "../controllers/user/userApiController.ts";
import { verifyToken } from "../utils/token.ts";
//===============================================================================

const router = Router();

//NEED TO MAKE MIDDLEWARE TO CHECK IF USER ID IS THE SAME AS THE
//USER YOU WANT TO INTERACT WITH OR THE ADMIN

router.get("/", verifyToken, userController.getAllUsers); // A & PM
router.get("/projects/:id", verifyToken,userController.getUserProjects); // U
router.get("/:id", verifyToken, userController.getUserById); // U

router.put("/password/:id",verifyToken, userController.editUserPassword); // A & PM 
router.put("/project/:userId/:projectId", verifyToken, userController.addProjectToUser); // A & PM
router.put("/project/:userId/:projectId", verifyToken, userController.removeProjectToUser); // A & PM
router.put("/:id", verifyToken, userController.editUser); // A

router.delete("/:id", verifyToken, userController.removeUser); // A

export default router;