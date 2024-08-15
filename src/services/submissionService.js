const SubmissionProducer = require("./../producers/submissionQueueProducer");

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
			throw { message: "Not able to create submission" };
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
