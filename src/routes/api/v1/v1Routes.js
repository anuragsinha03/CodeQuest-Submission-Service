const fastify = require("fastify");
// const submissionRoutes = require("./submissionRoutes");

async function v1Plugin(fastify, options) {
	fastify.register(require("./submissionRoutes"), { prefix: "/submissions" });
	fastify.register(require("./testRoutes"), { prefix: "/test" });
}

module.exports = v1Plugin;
