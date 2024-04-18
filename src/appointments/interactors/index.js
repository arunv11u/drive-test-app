const { createAppointmentInteractor } = require("./create-appointment.interactor");
const { downloadTestResultsInteractor } = require("./download-test-results.interactor");
const { getAllAppointmentSlotsOfADayInteractor } = require("./get-all-appointment-slots-of-a-day.interactor");
const { getAllBookedAppointmentsInteractor } = require("./get-all-booked-appointments.interactor");
const { getAppointmentWithUserInteractor } = require("./get-appointment-with-user.interactor");
const { getAppointmentInteractor } = require("./get-appointment.interactor");

module.exports = {
	createAppointmentInteractor,
	downloadTestResultsInteractor,
	getAllAppointmentSlotsOfADayInteractor,
	getAllBookedAppointmentsInteractor,
	getAppointmentWithUserInteractor,
	getAppointmentInteractor
};