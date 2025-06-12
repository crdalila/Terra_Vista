//===============================================================================
// name: roleMiddleware
// desc: code for creating and verifing the token
//===============================Dependency Imports==============================
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken';
//=================================Common Imports================================
import User from "../../models/user.ts";
import { IGetUserAuthInfoRequest } from '../token.ts';
//================================Error Management===============================
import { UserDoesNotExist, UserAccessLevelNotEnough } from '../errors/userErrors.ts';
import catchError from '../errors/controllerError.ts';
//===============================================================================

async function verifyRole(req: Request, res: Response, next: NextFunction) {
  try {
    const id = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    const user = await User.findById(id).select("-password");
    if (!user) throw new UserDoesNotExist();
    if (user.role == "client") throw new UserAccessLevelNotEnough();
    ((req as IGetUserAuthInfoRequest)).role = user.role; 
    next();
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
};

export default verifyRole;