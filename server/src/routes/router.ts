
import { Router } from "express";
import authRouter from "./authRouter.ts";
const router = Router();

router.use("/",authRouter);


export default router