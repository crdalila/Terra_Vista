//===============================================================================
// name: authApiController.ts
// desc: Controller of auth with the register and login 
// function with the respective try catches
//===============================Dependency Imports==============================
import { Request, Response } from 'express'
//=================================Common Imports================================
import authController from "./authController.ts";
import { createToken } from "../../utils/token.ts";
import User, { userInterface } from "../../models/user.ts";
//================================Error Management===============================
import catchError from '../../utils/errors/controllerError.ts';
//===============================================================================

//Register a user or throws an error
async function register(req: Request, res: Response) {
  try {
    console.log("Register has been entered")
    //Get parameters for function to work
    const userData: userInterface = req.body;

    //Do the function and send the result in json format
    const result = await authController.register(userData);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

async function firstLogin(req: Request, res: Response) {
  try {
    //Get parameters for function to work
    const { email, temporalPassword, password } = req.body;

    //Do the function and send the result in json format
    const result = await authController.firstLogin(email, temporalPassword, password);
    res.json(result);
  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}


//Logs a user in or throws an error
async function login(req: Request, res: Response) {

  try {
    //Get parameters for function to work
    const { email, password } = req.body;

    //Do the function to get the user
    const user = await authController.login(email, password);

    //Creates a token using the id
    const token = await createToken({ _id: user._id });
    /*the .select("-password") is for the 
    login not to sends the password in the json*/
    const userData = await User.findOne({ email }).select("-password");

    //Creates a cookie using the token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 // 1 hora
    });

    //Returns information in json format
    res.json({ userData });

  } catch (error) {
    /* If something went wrong it will catch it an show it with a personalize message */
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
}

export default {
  register,
  login,
  firstLogin
}