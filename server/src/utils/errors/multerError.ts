export class FileTooLargeError extends Error {
	statusCode = 413;
	constructor() {
		super("File too large. Max size is 50 MB.");
		this.name = "FileTooLargeError";
		this.statusCode = 413;
	}
};

export class InvalidFileTypeError extends Error {
	statusCode = 415;
	constructor() {
		super("Only JPG, JPEG, PNG and WEBP images are allowed.");
		this.name = "InvalidFileTypeError";
		this.statusCode = 415;
	}
};