// Middleware function to validate inputs for getting all appointment slots of a day
const validateGetAllAppointmentSlotsOfADayInputs = () => {
    return function (request, response, next) {
        try {
            // Check if appointment date is provided in query parameters
            if (!request.query.date)
                throw new Error("Appointment date is required");

            // Proceeding to the next middleware if all inputs are valid
            next();
        } catch (error) {
            // Throwing an error with appropriate message and error code if any validation fails
            throw { error: error.message, errorCode: 400 };
        }
    }
};

// Export the validateGetAllAppointmentSlotsOfADayInputs middleware function
module.exports = { validateGetAllAppointmentSlotsOfADayInputs };