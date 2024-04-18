// Validation middleware function to ensure required inputs are provided for booking a G driving test
const validateBookGDrivingTestInputs = () => {
    return function (request, response, next) {
        try {
            // Checking if car details are provided
            if (!request.body.carDetails)
                throw new Error("Car details are required");

            // Checking if make of the car is provided
            if (!request.body.carDetails.make)
                throw new Error(`"carDetails.make" is required`);

            // Checking if model of the car is provided
            if (!request.body.carDetails.model)
                throw new Error(`"carDetails.model" is required`);

            // Checking if year of the car is provided
            if (!request.body.carDetails.year)
                throw new Error(`"carDetails.year" is required`);

            // Checking if year of the car is a valid number
            if (!parseInt(request.body.carDetails.year))
                throw new Error(`"carDetails.year" must be a number`);

            // Checking if plate number of the car is provided
            if (!request.body.carDetails.plateNumber)
                throw new Error(`"carDetails.plateNumber" is required`);

            // Proceeding to the next middleware if all inputs are valid
            next();
        } catch (error) {
            // Throwing an error with appropriate message and error code if any validation fails
            throw { error: error.message, errorCode: 400 };
        }
    }
};

// Exporting the validation middleware function for external use
module.exports = { validateBookGDrivingTestInputs };
