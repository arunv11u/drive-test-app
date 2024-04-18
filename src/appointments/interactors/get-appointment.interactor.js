const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");

// Interactor function for retrieving a specific appointment
async function getAppointmentInteractor(requestDTO) {
	// Initialize an empty response DTO
	const responseDTO = {};

	// Initialize the appointment repository
	const appointmentRepository = AppointmentRepository();

	// Check authorization using the provided auth token
	await checkAuthorization(requestDTO.authToken);

	// Retrieve the appointment details from the repository using the provided appointmentId
	const appointment = await appointmentRepository.get(requestDTO.appointmentId);

	// Populate the response DTO with appointment details
	responseDTO.id = appointment.id;
	responseDTO.date = appointment.date;
	responseDTO.time = appointment.time;
	responseDTO.isTimeSlotAvailable = appointment.isTimeSlotAvailable;
	responseDTO.slot = appointment.slot;

	// Return the response DTO
	return responseDTO;
}

// Export the getAppointmentInteractor function
module.exports = { getAppointmentInteractor };