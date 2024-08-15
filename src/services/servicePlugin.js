const SubmissionService = require("./submissionService");
const fastifyPlugin = require("fastify-plugin");

async function servicePlugin(fastify, options) {
	//  The decorate function is used to add new properties or methods to various parts of the Fastify instance,  such as the Fastify instance itself, the request object, and the reply object.
	//	This is particularly useful for extending Fastify's functionality in a modular and reusable way.
	fastify.decorate(
		"submissionService",
		new SubmissionService(this.submissionRepository)
	);
}

module.exports = fastifyPlugin(servicePlugin);
