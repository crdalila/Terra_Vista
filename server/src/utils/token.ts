//===============================================================================
// name: token.ts
// desc: code for creating and verifing the token
//===============================Dependency Imports==============================
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express'
//===============================================================================


dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
if (JWT_SECRET == "") throw new Error("JWT_SECRET IS NOT SET CORRECTLY");


interface IGetUserAuthInfoRequest extends Request {
  user: string | jwt.JwtPayload
}

/**
 * Creates a token
 * @param {string} password - The password that will be hashed
 * @returns {string} created token
 */
async function createToken(userData: string | Buffer | object) {
  const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

/**
 * Verify if the token is not expire or not correct
 * @param {string} token - Token that will be checked
 */

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) res.status(401).json({ error: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as IGetUserAuthInfoRequest).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export {
  createToken,
  verifyToken,
  IGetUserAuthInfoRequest
}
