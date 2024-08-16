const fastify = require("fastify")({ logger: true }); //calling the fastify constructor
const app = require("./app");
const serverConfig = require("./config/serverConfig");
const connectToDB = require("./config/dbConfig");
const errorHandler = require("./utils/errorHandler");

fastify.register(app);
fastify.setErrorHandler(errorHandler);

fastify.listen({ port: serverConfig.PORT }, async err => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	await connectToDB();
	console.log(`Server started at Port: ${serverConfig.PORT}`);
});
