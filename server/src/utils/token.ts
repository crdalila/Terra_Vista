import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


function createToken(userData : string){
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
