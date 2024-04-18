// Middleware function to validate inputs for creating an appointment
const validateCreateAppointmentTestInputs = () => {
    return function (request, response, next) {
        try {
            // Check if appointment date is provided
            if (!request.body.date)
                throw new Error("Appointment date is required");

            // Check if appointment time is provided
            if (!request.body.time)
                throw new Error("Appointment time is required");

            // Check if appointment slot is provided
            if (!request.body.slot)
                throw new Error("Appointment slot is required");

            // Proceeding to the next middleware if all inputs are valid
            next();
        } catch (error) {
            console.log("error ::", error);
            // Throwing an error with appropriate message and error code if any validation fails
            throw { error: error.message, errorCode: 400 };
        }
    }
};

// Export the validateCreateAppointmentTestInputs middleware function
module.exports = { validateCreateAppointmentTestInputs };