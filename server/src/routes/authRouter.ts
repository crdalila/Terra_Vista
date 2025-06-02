//===============================================================================
// name: authRouter.ts
// desc: routers of auth related end points
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import authController from "../controllers/auth/authApiController.ts";
//===============================================================================

const router = Router();

router.post("/register",authController.register);
router.post("/login",authController.login);

export default router;