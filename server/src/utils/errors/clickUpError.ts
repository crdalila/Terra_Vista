
export class UserNotFound extends Error {
	statusCode : number;
	constructor() {
		super("User name not found");
		this.statusCode = 404;
	}
}

export class ClickUpTokenNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Token not provided");
		this.statusCode = 400;
	}
}

export class ClickUpWorkspaceIdNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Workspace ID not provided");
		this.statusCode = 400;
	}
}

export class ClickUpSpaceIdNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Space ID not provided");
		this.statusCode = 400;
	}
}

export class ClickUpListIdNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp List ID not provided");
		this.statusCode = 400;
	}
}

export class ClickUpTaskDataNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Task Data not provided");
		this.statusCode = 400;
	}
}

export class ClickUpTaskIdNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Task ID not provided");
		this.statusCode = 400;
	}
}

export class ClickUpStatusNotProvided extends Error {
	statusCode : number;
	constructor() {
		super("ClickUp Status not provided");
		this.statusCode = 400;
	}
}

export class ClickUpAPIError extends Error {
	statusCode: number;
	constructor() {
		super("ClickUp API Error");
		this.statusCode = 500;
	}
}