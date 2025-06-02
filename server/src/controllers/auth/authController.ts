//===============================================================================
// name: authController.ts
// desc: Controller of auth with the register and login function
//=================================Common Imports================================
import User, { userInterface } from "../../models/user.ts";
import { hash, compare } from "../../utils/bcrypt.ts";
//================================Error Management===============================
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials
} from "../../utils/errors/userErrors.ts";
//===============================================================================

/**
 * Creates a user if all information send is correct
 * @param {userInterface} userData - Object that contains name, password, email and more
 * @throws {UserNameNotProvided}
 * @throws {UserEmailNotProvided}
 * @throws {UserInvalidCredentials}
 * @throws {UserPasswordNotProvided}
 * @throws {UserEmailAlreadyExists}
 * @returns {mongoose.model<userInterface>} the user created or an error
 */
async function register(userData: userInterface) {
    //Error checking for name and email
    if (!userData.name) throw new UserNameNotProvided();
    if (!userData.email) throw new UserEmailNotProvided();

    //This regex force the password to have a lower case, 
    //upper case, number, symbol and at least be 8 character long
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    //Error checking for password
    if (!pwdRegex.test(userData.password)) throw new UserInvalidCredentials();
    if (!userData.password) throw new UserPasswordNotProvided();

    //This regex force the email to have a text similar to 
    // x@x.x
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //Error checking for email
    if (!emailRegex.test(userData.email)) throw new UserInvalidCredentials();

    const oldUser = await User.findOne({ email: userData.email });

    //Error checking for user
    if (oldUser) throw new UserEmailAlreadyExists();

    const hashedPassword = await hash(userData.password);

    userData.password = hashedPassword;
    const newUser = new User(userData);
    await newUser.save();

    return newUser;
}

/**
 * Log in a user or throws and error
 * @param {string} email - the email of the user that wants to be logged in
 * @param {string} password - the password of the user that wants to be logged in
 * @throws {UserEmailNotProvided}
 * @throws {UserInvalidCredentials}
 * @throws {UserPasswordNotProvided}
 * @returns {mongoose.model<userInterface>} the user created or an error
 */
async function login(email: string, password: string) {
    //Error checking for email and password
    if (!email) throw new UserEmailNotProvided();
    if (!password) throw new UserPasswordNotProvided();

    const user = await User.findOne({ email });
    //Error checking for user
    if (!user) throw new UserInvalidCredentials();

    const isSamePassword = await compare(password, user.password);
    //Error checking for password
    if (!isSamePassword) throw new UserInvalidCredentials();

    return user;
}

export default {
    register,
    login
}