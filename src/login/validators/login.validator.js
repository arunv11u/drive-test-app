// Validation middleware function to ensure required inputs are provided for login
const validateLoginInputs = () => {
	return function (request, response, next) {
		try {
			// Checking if username is provided
			if (!request.body.username)
				throw new Error("Username is required");

			// Checking if password is provided
			if (!request.body.password)
				throw new Error("Password is required");

			// Proceeding to the next middleware if all inputs are valid
			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
}

// Exporting the validation middleware function for external use
module.exports = { validateLoginInputs };