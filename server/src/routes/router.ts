//===============================================================================
// name: router.ts
// desc: routers of all the api
//===============================Dependency Imports==============================
import { Router } from "express";
//=================================Common Imports================================
import authRouter from "./authRouter.ts";
import userRouter from "./userRouter.ts";
import projectRouter from "./projectRouter.ts";
import clickUpRouter from "./clickUpRouter.ts";
import { sendMailController } from "../utils/mailer.ts";
//===============================================================================

const router = Router();

router.use("/",authRouter);
router.use("/user",userRouter);
router.use("/project",projectRouter);
router.use("/clickUp",clickUpRouter);
router.get("/mail",sendMailController);

export default router;