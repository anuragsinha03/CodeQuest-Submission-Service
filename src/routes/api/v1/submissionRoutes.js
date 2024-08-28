const {
	createSubmission,
} = require("../../../controllers/submissionController");
const authMiddleware = require("../../../middlewares/authMiddleware");

async function submissionRoutes(fastify, options) {
	// fastify.post("/", { preHandler: authMiddleware }, createSubmission);
	fastify.post("/", createSubmission);
}

module.exports = submissionRoutes;
