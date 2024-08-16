const { Worker } = require("bullmq");
const axios = require("axios");
const Submission = require("./../models/submissionModel");
const SubmissionRepository = require("./../repositories/submissionRepository");
const redisConnection = require("./../config/redisConfig");

function evaluationWorker(queue) {
	new Worker(
		"EvaluationQueue",
		async job => {
			if (job.name === "EvaluationJob") {
				try {
					console.log("UserID: ", job.data.userId);
					const response = await axios.post(
						"http://localhost:3005/sendPayload",
						{
							userId: job.data.userId,
							payload: job.data,
						}
					);

                    // Now, Update the submission status from PENDING to Current Status
					const submissionId = job.data.submissionId;
					const status = job.data.response.status;

					const repo = new SubmissionRepository(new Submission());
					const updatedStatus = await repo.updateSubmissionStatus(
						submissionId,
						status
					);

					console.log("Status updated: ", updatedStatus);

					console.log(
						"response recieved at submission service: ",
						response
					);
				} catch (error) {
					console.log("Error occ: ", error);
				}
			}
		},
		{ connection: redisConnection }
	);
}

module.exports = evaluationWorker;
