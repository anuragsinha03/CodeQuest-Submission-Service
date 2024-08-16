const { Worker } = require("bullmq");
const redisConnection = require("./../config/redisConfig");
const axios = require("axios");

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
