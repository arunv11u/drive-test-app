
const validateGetAllBookedAppointmentsInputs = () => {
	return function (request, response, next) {
		try {
			if (request.query.testType) {
				if (!["G2", "G"].includes(request.query.testType))
					throw new Error("Test type is invalid");
			}

			if (request.query.examResult) {
				if (!["Pass", "Fail"].includes(request.query.examResult))
					throw new Error("Exam result is invalid");
			}

			// Proceeding to the next middleware if all inputs are valid
			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
};

module.exports = { validateGetAllBookedAppointmentsInputs };