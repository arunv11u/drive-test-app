const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");



async function getAllBookedAppointmentsInteractor(requestDTO) {
	const responseDTO = {
		docs: [],
		count: 0
	};

	await checkAuthorization(requestDTO.authToken);
	
	const appointmentRepository = AppointmentRepository();
	const appointments = await appointmentRepository
		.getAllBookedAppointments(requestDTO.testType, requestDTO.examResult);

	appointments.forEach(appointment => {
		responseDTO.docs.push(appointment);
	});
	responseDTO.count = appointments.length;

	return responseDTO;
}

module.exports = { getAllBookedAppointmentsInteractor };