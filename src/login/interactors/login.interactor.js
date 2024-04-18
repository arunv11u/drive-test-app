const { UserRepository } = require("../../users/repositories/user.repository"); // Importing UserRepository
const { JSONWebToken } = require("../../utils/json-web-token"); // Importing JSONWebToken utility
const { PasswordChecker } = require("../../utils/password-checker"); // Importing PasswordChecker utility

/**
 * Interactor function to handle user login.
 * @param {object} requestDTO - Request data transfer object containing username and password.
 * @returns {object} - Response data transfer object containing authentication token and user details.
 */
async function loginInteractor(requestDTO) {
	const responseDTO = {}; // Initialize response DTO
	const userRepository = UserRepository(); // Create an instance of UserRepository
	const jsonWebToken = new JSONWebToken(); // Create an instance of JSONWebToken utility
	const passwordChecker = new PasswordChecker(); // Create an instance of PasswordChecker utility

	// Fetch user details from the database based on provided username
	const user = await userRepository.getWithUsername(requestDTO.username);
	if (!user) throw { error: "Username not found, please register to continue.", errorCode: 400 };

	// Check if the provided password matches the user's stored password
	const isPasswordMatch = await passwordChecker.isMatch(requestDTO.password, user.password);
	if (!isPasswordMatch) throw { error: "Invalid Credentials!", errorCode: 403 };

	// Generate an authentication token for the user
	const authToken = await jsonWebToken.sign({ userId: user.id.toString(), userType: user.userType });

	// Populate response DTO with user details and authentication token
	responseDTO.authToken = authToken;
	responseDTO.id = user.id;
	responseDTO.username = user.username;
	responseDTO.userType = user.userType;
	responseDTO.firstName = user.firstName;
	responseDTO.lastName = user.lastName;
	responseDTO.licenseNumber = user.licenseNumber;
	responseDTO.age = user.age;
	responseDTO.dateOfBirth = user.dateOfBirth;
	responseDTO.carDetails = user.carDetails;

	return responseDTO; // Return the response DTO
}

module.exports = { loginInteractor }; // Export the login interactor function