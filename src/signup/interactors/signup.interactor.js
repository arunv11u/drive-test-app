const { UserRepository } = require("../../users/repositories/user.repository");

/**
 * Interactor function to handle user signup
 * @param {object} requestDTO - Request data transfer object containing username, password, and userType
 * @returns {object} - Response data transfer object containing user details
 */
async function signupInteractor(requestDTO) {
	// Initialize the response DTO
	const responseDTO = {};
	// Create an instance of the UserRepository
	const userRepository = UserRepository();

	// Check if the username already exists
	const isUserExists = await userRepository.isUserExistsWithUsername(requestDTO.username);
	if (isUserExists) throw { error: "Username already exists", errorCode: 403 };

	// Create a new user object with the provided data
	const newUser = {
		username: requestDTO.username,
		password: requestDTO.password,
		userType: requestDTO.userType
	};
	// Save the new user in the database
	const user = await userRepository.save(newUser);

	// Populate the response DTO with user details
	responseDTO.id = user.id;
	responseDTO.username = user.username;
	responseDTO.userType = user.userType;
	responseDTO.firstName = user.firstName;
	responseDTO.lastName = user.lastName;
	responseDTO.licenseNumber = user.licenseNumber;
	responseDTO.age = user.age;
	responseDTO.dateOfBirth = user.dateOfBirth;
	responseDTO.carDetails = user.carDetails;

	// Return the response DTO
	return responseDTO;
}

// Export the signup interactor function for external use
module.exports = { signupInteractor };