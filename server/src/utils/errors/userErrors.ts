//===============================================================================
// name: userErrors.ts
// desc: All errrors related to the user
//===============================================================================

class UserNameNotProvided extends Error {
    statusCode : number;
    constructor(){
        super("User name not provided");
        this.statusCode = 400;
    }
}

class UserEmailNotProvided extends Error {
    statusCode : number;
    constructor(){
        super("User email not provided");
        this.statusCode = 400;
    }
}
class UserPasswordNotProvided extends Error {
    statusCode : number;
    constructor(){
        super("User password not provided");
        this.statusCode = 400;
    }
}

class UserEmailAlreadyExists extends Error{
    statusCode : number;
    constructor(){
        super("User email already exists");
        this.statusCode = 400;
    }
}
class UserInvalidCredentials extends Error {
    statusCode : number;
    constructor(){
        super("Invalid credentials");
        this.statusCode = 401;
    }
}

class UserDoesNotExist extends Error {
    statusCode : number;
    constructor(){
        super("User does not exist");
        this.statusCode = 204;
    }
}

export {
    UserNameNotProvided,
    UserEmailNotProvided,
    UserPasswordNotProvided,
    UserEmailAlreadyExists,
    UserInvalidCredentials,
    UserDoesNotExist
}