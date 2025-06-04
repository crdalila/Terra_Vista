//===============================================================================
// name: router.ts
// desc: routers of all the api
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import authRouter from "./authRouter.ts";
import userRouter from "./userRouter.ts"
import clickUpRouter from "./clickUp.ts";
//===============================================================================

const router = Router();

router.use("/",authRouter);
router.use("/user",userRouter);
router.use("/clickUp",clickUpRouter);

export default router;