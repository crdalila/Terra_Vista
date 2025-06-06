//===============================================================================
// name: roleMiddleware
// desc: code for creating and verifing the token
//===============================Dependency Imports==============================
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken';
//=================================Common Imports================================
import { IGetUserAuthInfoRequest } from '../token.ts';
import User from "../../models/user.ts";
//================================Error Management===============================
import {
  UserAccessingIsNotTheSameAsUserTryingToBeChanged,
  UserDoesNotExist,
  UserDoesNotHaveThisProject
} from '../errors/userErrors.ts';
import catchError from '../errors/controllerError.ts';
import { ProjectIdNotGiven } from '../errors/projectError.ts';
//===============================================================================

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    if (((req as IGetUserAuthInfoRequest).role == "client")) {
      if (id != req.params.id) throw new UserAccessingIsNotTheSameAsUserTryingToBeChanged();
    }
    next();
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
};

async function verifyUserHasProject(req: Request, res: Response, next: NextFunction) {
  try {
    const id = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    const user = await User.findById(id).select("-password");
    if (!user) throw new UserDoesNotExist();
    if (user.role == "client") {
      let paramsId = req.params.id;

      if (!paramsId) paramsId = req.params.projectId;
      if (!paramsId) throw new ProjectIdNotGiven();

      if (!user.projects.some((projectId) => {
        return projectId.toString() == paramsId;
      })) throw new UserDoesNotHaveThisProject();

    }
    next();
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
};

export { verifyUser, verifyUserHasProject };