//===============================================================================
// name: authController.ts
// desc: Controller of auth with the register and login function
//=================================Common Imports================================
import User, { userInterface } from "../../models/user.ts";
import { hash, compare } from "../../utils/bcrypt.ts";

import { ObjectId } from "mongoose";
//================================Error Management===============================
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserInvalidEmail,
    UserInvalidPassword,
    UserDoesNotExist,
} from "../../utils/errors/userErrors.ts";
import { isPasswordCorrect } from "../../utils/passwordChecking.ts";
import { projectSelect, taskSelect, userSelect } from "../../utils/modelsSelect.ts";
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

    if (!isPasswordCorrect(userData.password)) throw new UserInvalidPassword();
    if (!userData.password) throw new UserPasswordNotProvided();

    //This regex force the email to have a text similar to 
    // x@x.x
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //Error checking for email
    if (!emailRegex.test(userData.email)) throw new UserInvalidEmail();

    const oldUser = await User.findOne({ email: userData.email });

    //Error checking for user
    if (oldUser) throw new UserEmailAlreadyExists();

    const hashedPassword = await hash(userData.password);

    userData.password = hashedPassword;
    const newUser = new User(userData);
    await newUser.save();
    const userWithoutPassword = await User.findOne({ email: userData.email })
        ;
    return userWithoutPassword;
}

async function firstLogin(email: string, temporalPassword: string, password: string) {
    if (!email) throw new UserEmailNotProvided();
    //This regex force the password to have a lower case, 
    //upper case, number, symbol and at least be 8 character long

    if (!isPasswordCorrect(temporalPassword)) throw new UserInvalidPassword();
    if (!isPasswordCorrect(password)) throw new UserInvalidPassword();
    if (!temporalPassword) throw new UserPasswordNotProvided();

    //This regex force the email to have a text similar to 
    // x@x.x
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    //Error checking for email
    if (!emailRegex.test(email)) throw new UserInvalidEmail();

    const user: userInterface & { _id: ObjectId; } =
        (await User.findOne({ email: email })) as userInterface & { _id: ObjectId; };
    if (!user) throw new UserDoesNotExist;
    const hashedPassword = await hash(password);
    const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { password: hashedPassword } },
        { new: true }).select(userSelect);
    if (!updatedUser) throw new UserDoesNotExist;
    return updatedUser;
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
    const user = await User.findOne({ email: email }).populate({
        path: 'projects',
        select: projectSelect,
        populate: {
            path: 'tasks',
            select: taskSelect
        }
    });
    //Error checking for user
    if (!user) throw new UserInvalidCredentials();

    const isSamePassword = await compare(password, user.password);
    //Error checking for password
    if (!isSamePassword) throw new UserInvalidCredentials();

    return user;
}

export default {
    register,
    firstLogin,
    login
}