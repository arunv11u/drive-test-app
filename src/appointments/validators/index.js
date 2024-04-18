const { validateCreateAppointmentTestInputs } = require("./create-appointment.validator");
const { validateGetAllAppointmentSlotsOfADayTestInputs } = require("./get-all-appointment-slots-of-a-day.validator");
const { validateGetAllBookedAppointmentsTestInputs } = require("./get-all-booked-appointments.validator");
const { validateGetAppointmentWithUserInputs } = require("./get-appointment-with-user.validator");
const { validateGetAppointmentInputs } = require("./get-appointment.validator");


module.exports = {
	validateCreateAppointmentTestInputs,
	validateGetAllBookedAppointmentsTestInputs,
	validateGetAllAppointmentSlotsOfADayTestInputs,
	validateGetAppointmentWithUserInputs,
	validateGetAppointmentInputs
};