const { pdfService } = require("../../utils");
const { checkAuthorization } = require("../../authorization/authorization");
const { AppointmentRepository } = require("../repositories/appointment.repository");
const { getTodayDateStr } = require("../../utils/helpers");



async function downloadTestResultsInteractor(requestDTO) {

	await checkAuthorization(requestDTO.authToken);

	const appointmentRepository = AppointmentRepository();
	const appointments = await appointmentRepository
		.getAllBookedAppointments();

	console.log("appointments ::", appointments);

	const templatePath = pdfService.getTemplatePath("pdf", "drive-test-result.hbs");
	const today = getTodayDateStr();
	const buffer = await pdfService.generatePdf(templatePath, { today, results: appointments });

	return buffer;
}

module.exports = { downloadTestResultsInteractor };