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
router.get("/projects/:id",userController.getUserProjects);

router.get("/:id",verifyToken,userController.getUserById);

router.put("/:id",verifyToken,userController.editUser);
router.delete("/:id",verifyToken,userController.removeUser);

export default router;