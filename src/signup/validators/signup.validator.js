/**
 * Middleware function to validate signup inputs
 * @returns {Function} Middleware function to be used in Express routes
 */
const validateSignupInputs = () => {
	return function (request, response, next) {
		try {
			// Checking if username is provided
			if (!request.body.username)
				throw new Error("Username is required");

			// Checking if password is provided
			if (!request.body.password)
				throw new Error("Password is required");

			// Checking if password meets minimum length requirement
			if (request.body.password.length < 4)
				throw new Error("Password must be minimum 4 characters");

			// Checking if user type is provided
			if (!request.body.userType)
				throw new Error("User type is required");

			// Proceeding to the next middleware if all inputs are valid
			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
}

module.exports = { validateSignupInputs };