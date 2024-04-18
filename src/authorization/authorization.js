// Importing JSONWebToken utility from the 'utils' directory
const { JSONWebToken } = require("../utils");

// Function to check authorization using JWT token
const checkAuthorization = async (authToken) => {
	try {
		// Check if authToken exists, if not, throw an error
		if (!authToken) throw new Error("Unauthorized!");

		// Verify the authToken using the JSONWebToken utility
		const payload = await new JSONWebToken().verify(authToken);

		// Return the payload if verification is successful
		return payload;
	} catch (error) {
		// If an error occurs, throw an object containing the error message and a 401 error code
		throw { error: error.message, errorCode: 401 };
	}
}

// Exporting the checkAuthorization function for use in other modules
module.exports = { checkAuthorization };
