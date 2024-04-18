const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");


async function getAppointmentWithUserInteractor(requestDTO) {
	const responseDTO = {};

	await checkAuthorization(requestDTO.authToken);

	const appointmentRepository = AppointmentRepository();


	const bookedAppointment = await appointmentRepository.getAppointmentWithUser(requestDTO.userId);

	responseDTO.user = bookedAppointment.user;
	responseDTO.appointment = bookedAppointment.appointment;

	return responseDTO;
}

module.exports = { getAppointmentWithUserInteractor };