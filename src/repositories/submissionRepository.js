const Submission = require("../models/submissionModel");

class SubmissionRepository {
	constructor() {
		this.submissionModel = Submission;
	}

	async createSubmission(submission) {
		const response = await this.submissionModel.create(submission);
		return response;
	}

	async updateSubmissionStatus(submissionId, status) {
		try {
			const updatedSubmission =
				await this.submissionModel.findByIdAndUpdate(
					submissionId,
					{ status: status },
					{ new: true }
				);

			if (!updatedSubmission) {
				throw new Error("Submission not found");
			}

			return updatedSubmission;
		} catch (error) {
			console.error("Error updating submission status:", error);
			throw error;
		}
	}
}

module.exports = SubmissionRepository;
