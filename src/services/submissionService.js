const SubmissionProducer = require("./../producers/submissionQueueProducer");
const SubmissionCreationError = require("./../errors/SubmissionCreationError");

class SubmissionService {
	constructor(submissionRepository) {
		this.submissionRepository = submissionRepository;
	}

	async pingCheck() {
		return "pong";
	}

	async addSubmission(submissionPayload) {
		const submission = await this.submissionRepository.createSubmission(
			submissionPayload
		);
		if (!submission) {
			//add error handling here
			throw new SubmissionCreationError(
				"Failed to create a submission in the repository!"
			);
		}
		console.log(submission);
		const response = await SubmissionProducer(submission);
		return {
			queueReponse: response,
			submission,
		};
	}
}

module.exports = SubmissionService;
