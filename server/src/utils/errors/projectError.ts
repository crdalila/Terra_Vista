//===============================================================================
// name: projectErrors.ts
// desc: All errrors related to the project
//===============================================================================
class ProjectDoesNotExist extends Error {
    statusCode: number;
    constructor() {
        super("Project does not exist");
        this.statusCode = 204;
    }
}

class ProjectIdNotGiven extends Error {
    statusCode: number;
    constructor() {
        super("Project id not given");
        this.statusCode = 204;
    }
}

class DataDoesNotExist extends Error {
    statusCode: number;
    constructor() {
        super("Data for project creation or update does not exist");
        this.statusCode = 204;
    }
}

class TaskDoesNotExist extends Error {
    statusCode: number;
    constructor() {
        super("Task does not exist");
        this.statusCode = 204;
    }
}

class ProjectAlreadyExists extends Error {
  statusCode = 409;
  constructor() {
    super("Project with this clickUpSpaceId already exists");
  }
}


export {
    DataDoesNotExist,
    ProjectIdNotGiven,
    ProjectDoesNotExist,
    TaskDoesNotExist,
	ProjectAlreadyExists
}