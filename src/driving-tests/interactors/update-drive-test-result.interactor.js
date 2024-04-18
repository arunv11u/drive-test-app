// Importing necessary modules
const { checkAuthorization } = require("../../authorization/authorization");
const { UserRepository } = require("../../users/repositories/user.repository");

async function updateDriveTestResultInteractor(requestDTO) {
	// Creating an instance of UserRepository
	const userRepository = UserRepository();

	// Authorizing the request using the provided auth token
	await checkAuthorization(requestDTO.authToken);

	await userRepository.updateDriveTestResult(requestDTO.userId, requestDTO.examResult, requestDTO.comments);
}

// Exporting the function for external use
module.exports = { updateDriveTestResultInteractor };