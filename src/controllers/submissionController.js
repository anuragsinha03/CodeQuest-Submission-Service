async function pingRequest(req, res) {
	console.log("TestService object: ", this.testService);
	const response = await this.testService.pingCheck();
	return res.send({ data: response });
}

// Add validation layer
async function createSubmission(req, res) {
	console.log("CODE: ", req.body.code);

	const response = await this.submissionService.addSubmission(req.body);
	return res.status(201).send({
		error: {},
		data: response,
		success: true,
		message: "Created submission successfully",
	});
}

module.exports = { pingRequest, createSubmission };
