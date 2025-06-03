//===============================================================================
// name: bcrypt.ts
// desc: code for hashing the password and compering the password with the hashed one
//===============================Dependency Imports==============================
import bcrypt from "bcrypt";
//===============================================================================

/**
 * Creates a hashed password using the password in the params and returns it
 * @param {string} password - The password that will be hashed
 * @returns {string} hassed password
 */
async function hash(password : string){
    const result = await bcrypt.hash(password,10);
    return result;
}

/**
 * Compares a password and it's hashed version, if it's the same, it will return true
 * @param {string} password - The password that will be compared to it's hashed version
 * @param {string} hash - The hashed password that will be compared to it's normal version
 * @returns {boolean} true if they are the same, false if not
 */
async function compare(password : string | Buffer,hash : string){
    const result = await bcrypt.compare(password,hash)
    return result;
}

export {
    hash,
    compare
}