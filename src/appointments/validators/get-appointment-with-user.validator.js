

const validateGetAppointmentWithUserInputs = () => {
	return function (request, response, next) {
		try {
			// Check if appointment id is provided in request parameters
			if (!request.query.userId)
				throw new Error("User id is required");

			// Proceeding to the next middleware if all inputs are valid
			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
};

module.exports = { validateGetAppointmentWithUserInputs };