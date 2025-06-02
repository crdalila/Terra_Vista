//===============================================================================
// name: token.ts
// desc: code for creating and verifing the token
//===============================Dependency Imports==============================
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//===============================================================================


dotenv.config();
const JWT_SECRET : string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
if(JWT_SECRET == "") throw new Error("JWT_SECRET IS NOT SET CORRECTLY");


/**
 * Creates a token
 * @param {string} password - The password that will be hashed
 * @returns {string} created token
 */
function createToken(userData : string | Buffer | object){
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

/**
 * Verify if the token is not expire or not correct
 * @param {string} token - Token that will be checked
 * @returns {boolean} true if the token is correct, false if not
 */
function verifyToken(token : string){
    const result = jwt.verify(token,JWT_SECRET);
    return result;
}

export{
    createToken,
    verifyToken
}
