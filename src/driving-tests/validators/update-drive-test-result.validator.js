
const validateUpdateDriveTestResultInputs = () => {
	return function (request, response, next) {
		try {
			if(!request.body.userId) 
				throw new Error("Exam taker, user id is required");

			if (!request.body.examResult)
				throw new Error("Exam result is required");

			if (!request.body.comments)
				throw new Error("Comments is required");

			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
};

// Exporting the validation middleware function for external use
module.exports = { validateUpdateDriveTestResultInputs };
