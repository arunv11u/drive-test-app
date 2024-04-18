// Validation middleware function to ensure required inputs are provided for booking a G2 driving test
const validateBookG2DrivingTestInputs = () => {
	return function (request, response, next) {
		try {
			// Checking if first name is provided
			if (!request.body.firstName)
				throw new Error("First Name is required");

			// Checking if last name is provided
			if (!request.body.lastName)
				throw new Error("Last Name is required");

			// Checking if license number is provided
			if (!request.body.licenseNumber)
				throw new Error("License Number is required");

			// Validating license number format using regex
			if (!new RegExp("^[A-Za-z][A-Za-z0-9-]{0,14}$").test(request.body.licenseNumber))
				throw new Error("License Number is invalid");

			// Checking if date of birth object is provided
			if (!request.body.dateOfBirth)
				throw new Error("Date Of Birth is required");

			// Checking if date of birth day is provided
			if (!request.body.dateOfBirth.date)
				throw new Error(`"dateOfBirth.date" is required`);

			// Checking if date of birth day is a valid number
			if (!parseInt(request.body.dateOfBirth.date))
				throw new Error(`"dateOfBirth.date" must be a number`);

			// Checking if date of birth month is provided
			if (!request.body.dateOfBirth.month)
				throw new Error(`"dateOfBirth.month" is required`);

			// Checking if date of birth month is a valid number
			if (!parseInt(request.body.dateOfBirth.month))
				throw new Error(`"dateOfBirth.month" must be a number`);

			// Checking if date of birth year is provided
			if (!request.body.dateOfBirth.year)
				throw new Error(`"dateOfBirth.year" is required`);

			// Checking if date of birth year is a valid number
			if (!parseInt(request.body.dateOfBirth.year))
				throw new Error(`"dateOfBirth.year" must be a number`);

			// Checking if car details object is provided
			if (!request.body.carDetails)
				throw new Error("Car details are required");

			// Checking if car make is provided
			if (!request.body.carDetails.make)
				throw new Error(`"carDetails.make" is required`);

			// Checking if car model is provided
			if (!request.body.carDetails.model)
				throw new Error(`"carDetails.model" is required`);

			// Checking if car year is provided
			if (!request.body.carDetails.year)
				throw new Error(`"carDetails.year" is required`);

			// Checking if car year is a valid number
			if (!parseInt(request.body.carDetails.year))
				throw new Error(`"carDetails.year" must be a number`);

			// Checking if car plate number is provided
			if (!request.body.carDetails.plateNumber)
				throw new Error(`"carDetails.plateNumber" is required`);

			if (!request.body.appointmentId)
				throw new Error("Appointment id is required");

			// Proceeding to the next middleware if all inputs are valid
			next();
		} catch (error) {
			// Throwing an error with appropriate message and error code if any validation fails
			throw { error: error.message, errorCode: 400 };
		}
	}
};

// Exporting the validation middleware function for external use
module.exports = { validateBookG2DrivingTestInputs };