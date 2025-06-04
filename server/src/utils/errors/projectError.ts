//===============================================================================
// name: projectErrors.ts
// desc: All errrors related to the project
//===============================================================================
class ProjectDoesNotExist extends Error {
    statusCode : number;
    constructor(){
        super("Project does not exist");
        this.statusCode = 204;
    }
}

class TaskDoesNotExist extends Error {
    statusCode : number;
    constructor(){
        super("Task does not exist");
        this.statusCode = 204;
    }
}


export {
ProjectDoesNotExist,
TaskDoesNotExist
}