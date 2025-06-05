//===============================================================================
// name: authRouter.ts
// desc: routers of auth related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import authController from "../controllers/auth/authApiController.ts";
import { verifyToken } from "../utils/token.ts";
//===============================================================================

const router = Router();

router.post("/register",verifyToken,authController.register);
router.post("/login",authController.login);
router.post("/firstLogin",authController.firstLogin);

export default router;