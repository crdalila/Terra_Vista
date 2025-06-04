//===============================================================================
// name: userErrors.ts
// desc: All errrors related to the user
//===============================================================================



class ProjectDoesNotExist extends Error {
    statusCode : number;
    constructor(){
        super("User does not exist");
        this.statusCode = 204;
    }
}

class ProjectAlreadyExist extends Error {
    statusCode : number;
    constructor(){
        super("User does not exist");
        this.statusCode = 204;
    }
}



export {
ProjectDoesNotExist

}