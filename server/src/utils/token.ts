import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET : string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
if(JWT_SECRET == "") throw new Error("JWT_SECRET IS NOT SET CORRECTLY");

function createToken(userData : string | Buffer | object){
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function verifyToken(token : string){
    const result = jwt.verify(token,JWT_SECRET);
    return result;
}

export{
    createToken,
    verifyToken
}
