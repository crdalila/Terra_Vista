import { createToken } from "../../utils/token.ts";
import authController from "./userController.ts";
import User from "../../models/user.ts";
import user, { userInterface } from "../../models/user.ts";
import { Request, Response } from 'express';


async function register(req : Request, res : Response) {
    try {
        const userData : userInterface = req.body;
        const result = await authController.register(userData);
        res.json(result);
    } catch (error : any) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
async function login(req : Request, res : Response) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);

        const payload = {
            _id:user._id,
        };

        const token = createToken(payload);
        const userData = await User.findOne({email}).select("-password");
        res.json({ token, userData });

    } catch (error : any) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default {
    register,
    login
}