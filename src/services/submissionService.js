const SubmissionProducer = require("./../producers/submissionQueueProducer");
const SubmissionCreationError = require("./../errors/SubmissionCreationError");
const { fetchProblemDetails } = require("../apis/problemAdminApi");

class SubmissionService {
	constructor(submissionRepository) {
		this.submissionRepository = submissionRepository;
	}

	async pingCheck() {
		return "pong";
	}

	async addSubmission(submissionPayload) {
		//Hit the problem service api and fetch the problem details
		const problemId = submissionPayload.problemId;
		const problemServiceApiResponse = await fetchProblemDetails(problemId);

		if (!problemServiceApiResponse) {
			throw new SubmissionCreationError(
				"Failed to create a submission in the repository!"
			);
		}

		console.log(problemServiceApiResponse.data.codeStubs);
		const languageCodeStubs = problemServiceApiResponse.data.codeStubs.find(
			codeStub =>
				codeStub.language.toLowerCase() ===
				submissionPayload.language.toLowerCase()
		);

		console.log(languageCodeStubs);
		if (submissionPayload.endSnippet != undefined) {
			submissionPayload.code =
				languageCodeStubs.startSnippet +
				"\n\n" +
				submissionPayload.code +
				"\n\n" +
				submissionPayload.endSnippet;
		} else {
			submissionPayload.code =
				languageCodeStubs.startSnippet +
				"\n\n" +
				submissionPayload.code;
		}

		// Now, we are going to create the entry in DB
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
		const response = await SubmissionProducer({
			[submission._id]: {
				code: submission.code,
				language: submission.language,
				inputCase: problemServiceApiResponse.data.testCases[0].input,
				outputCase: problemServiceApiResponse.data.testCases[0].output,
			},
		});
		return {
			queueReponse: response,
			submission,
		};
	}
}

module.exports = SubmissionService;
