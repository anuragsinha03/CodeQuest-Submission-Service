const admin = require("./../firebaseAdmin");

async function authMiddleware(request, reply, done) {
	const token = request.headers.authorization?.split("Bearer ")[1];
	if (!token) {
		return reply.status(401).send({ message: "Unauthorized" });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		request.user = decodedToken;
		done();
	} catch (error) {
		return reply.status(401).send({ message: "Unauthorized" });
	}
}

module.exports = authMiddleware;
