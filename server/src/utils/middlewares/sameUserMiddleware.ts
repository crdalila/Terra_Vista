//===============================================================================
// name: roleMiddleware
// desc: code for creating and verifing the token
//===============================Dependency Imports==============================
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken';
//=================================Common Imports================================
import { IGetUserAuthInfoRequest } from '../token.ts';
//================================Error Management===============================
import { 
  UserAccessingIsNotTheSameAsUserTryingToBeChanged 
} from '../errors/userErrors.ts';
import catchError from '../errors/controllerError.ts';
//===============================================================================

async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = ((req as IGetUserAuthInfoRequest).user as JwtPayload)._id;
    if(((req as IGetUserAuthInfoRequest).role == "client" )) {
      if(id != req.params.id) throw new UserAccessingIsNotTheSameAsUserTryingToBeChanged(); 
    }
    next();
  } catch (error) {
    const myError = catchError(error);
    res.status(myError.statusCode).json(myError.message);
  }
};

export default verifyUser;