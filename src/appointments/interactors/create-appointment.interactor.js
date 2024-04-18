const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");

// Interactor function for creating a new appointment
async function createAppointmentInteractor(requestDTO) {
	// Initialize an empty response DTO
	const responseDTO = {};

	// Initialize the appointment repository
	const appointmentRepository = AppointmentRepository();

	// Check authorization using the provided auth token
	await checkAuthorization(requestDTO.authToken);

	// Create a new appointment object
	const newAppointment = {
		date: requestDTO.date,
		time: requestDTO.time,
		slot: requestDTO.slot,
		isTimeSlotAvailable: true // Assuming the time slot is initially available
	};

	// Save the new appointment to the repository
	const appointment = await appointmentRepository.create(newAppointment);

	// Populate the response DTO with appointment details
	responseDTO.id = appointment.id;
	responseDTO.date = appointment.date;
	responseDTO.time = appointment.time;
	responseDTO.slot = appointment.slot;
	responseDTO.isTimeSlotAvailable = appointment.isTimeSlotAvailable;

	// Return the response DTO
	return responseDTO;
}

// Export the createAppointmentInteractor function
module.exports = { createAppointmentInteractor };