//===============================================================================
// name: authApiController.ts
// desc: Controller of auth with the register and login function with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import authController from "./authController.ts";
import User, { userInterface } from "../../models/user.ts";
import { createToken } from "../../utils/token.ts";
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';

//Register a user or throws an error
async function register(req: Request, res: Response) {
    try {
        const userData: userInterface = req.body;
        const result = await authController.register(userData);
        res.json(result);
    } catch (error: any) {
        const myError = catchError(error);
        res.status(myError.statusCode).json(myError.message);
    }
}

//Logs a user in or throws an error
async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);

        const payload = { _id: user._id };

        const token = createToken(payload);
        /*the .select("-password") is for the 
        login not to sends the password in the json*/
        const userData = await User.findOne({ email }).select("-password");
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hora
        });
        res.json({ userData });

    } catch (error: any) {
        const myError = catchError(error);
        res.status(myError.statusCode).json(myError.message);
    }
}

export default {
    register,
    login
}