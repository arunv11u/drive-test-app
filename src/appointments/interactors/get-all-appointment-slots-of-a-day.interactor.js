const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");

// Interactor function for retrieving all appointment slots of a specific day
async function getAllAppointmentSlotsOfADayInteractor(requestDTO) {
	// Initialize an empty response DTO
	const responseDTO = {
		docs: [], // Array to store appointment slots
		count: 0 // Total count of appointment slots
	};

	// Initialize the appointment repository
	const appointmentRepository = AppointmentRepository();

	// Check authorization using the provided auth token
	await checkAuthorization(requestDTO.authToken);

	// Retrieve all appointment slots for the given date from the repository
	const appointments = await appointmentRepository.getAllAppointmentSlotsOfADay(requestDTO.date);

	// Iterate through each appointment slot and populate the response DTO
	appointments.forEach(appointment => {
		responseDTO.docs.push({
			id: appointment.id,
			date: appointment.date,
			time: appointment.time,
			isTimeSlotAvailable: appointment.isTimeSlotAvailable,
			slot: appointment.slot
		});
	});

	// Update the count of appointment slots in the response DTO
	responseDTO.count = appointments.length;

	// Return the response DTO
	return responseDTO;
}

// Export the getAllAppointmentSlotsOfADayInteractor function
module.exports = { getAllAppointmentSlotsOfADayInteractor };