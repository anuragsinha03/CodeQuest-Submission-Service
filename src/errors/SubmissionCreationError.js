const BaseError = require("./BaseError");
const { StatusCodes } = require("http-status-codes");

class SubmissionCreationError extends BaseError {
	constructor(details) {
		super(
			"Not able to create submission",
			StatusCodes.BAD_REQUEST,
			details
		);
	}
}

module.exports = SubmissionCreationError;
