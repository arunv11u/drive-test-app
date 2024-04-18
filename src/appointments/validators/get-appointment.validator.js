// Middleware function to validate inputs for getting a specific appointment
const validateGetAppointmentInputs = () => {
    return function (request, response, next) {
        try {
            // Check if appointment id is provided in request parameters
            if (!request.params.id)
                throw new Error("Appointment id is required");

            // Proceeding to the next middleware if all inputs are valid
            next();
        } catch (error) {
            // Throwing an error with appropriate message and error code if any validation fails
            throw { error: error.message, errorCode: 400 };
        }
    }
};

// Export the validateGetAppointmentInputs middleware function
module.exports = { validateGetAppointmentInputs };