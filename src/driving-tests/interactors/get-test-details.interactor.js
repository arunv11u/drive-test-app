// Importing necessary modules
const { checkAuthorization } = require("../../authorization/authorization");
const { UserRepository } = require("../../users/repositories/user.repository");

// Asynchronous function to retrieve test details with license number
async function getTestDetailsInteractor(requestDTO) {
	// Initializing response DTO
	const responseDTO = {};
	// Creating an instance of UserRepository
	const userRepository = UserRepository();

	// Authorizing the request using the provided auth token
	const userPayload = await checkAuthorization(requestDTO.authToken);
	// Fetching user details from the database using the user ID from the authorization payload
	const user = await userRepository.getWithId(userPayload.userId);

	// Populating response DTO with user details
	responseDTO.id = user.id;
	responseDTO.firstName = user.firstName;
	responseDTO.lastName = user.lastName;
	responseDTO.licenseNumber = user.licenseNumber;
	responseDTO.age = user.age;
	responseDTO.dateOfBirth = user.dateOfBirth;
	responseDTO.carDetails = user.carDetails;
	responseDTO.appointmentId = user.appointmentId;

	// Returning the response DTO
	return responseDTO;
}

// Exporting the function for external use
module.exports = { getTestDetailsInteractor };