async function testRoutes(fastify, options) {
	fastify.get("/", async (req, res) => {
		res.send({
			msg: "hello",
		});
	});
}

module.exports = testRoutes;
