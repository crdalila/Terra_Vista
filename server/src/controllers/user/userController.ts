import User from "../../models/user.ts";
import { hash, compare } from "../../utils/bcrypt.ts";
import {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials
} from "../../utils/errors/userErrors.ts";

import { userInterface } from "../../models/user.ts";


async function register(userData : userInterface) {
    if (!userData.name) {
        throw new UserNameNotProvided();
    }

    if (!userData.email) {
        throw new UserEmailNotProvided();
    }

    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!pwdRegex.test(userData.password)) {
        throw new UserInvalidCredentials();
    }

    if (!userData.password) {
        throw new UserPasswordNotProvided();
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(userData.email)) {
        throw new UserInvalidCredentials();
    }

    const oldUser = await User.findOne({email: userData.email});

    if (oldUser) {
        throw new UserEmailAlreadyExists();
    }

    const hashedPassword = await hash(userData.password);

    userData.password = hashedPassword;
    const newUser = new User(userData);
    await newUser.save();

    return newUser;
}

async function login(email : string, password : string) {

    if (!email) {
        throw new UserEmailNotProvided();
    }

    if (!password) {
        throw new UserPasswordNotProvided();
    }

    const user = await User.findOne({email});

    if (!user) throw new UserInvalidCredentials();

    const isSamePassword = await compare(password, user.password);

    if (!isSamePassword) throw new UserInvalidCredentials();

    return user;

}

export default {
    register,
    login
}