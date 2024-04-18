const express = require("express");
const { getCookiesMiddleware } = require("../../utils/middlewares");
const {
	validateCreateAppointmentTestInputs,
	validateGetAppointmentInputs,
	validateGetAppointmentWithUserInputs
} = require("../validators");
const {
	createAppointmentInteractor,
	getAllAppointmentSlotsOfADayInteractor,
	getAppointmentInteractor,
	getAllBookedAppointmentsInteractor,
	getAppointmentWithUserInteractor,
	downloadTestResultsInteractor
} = require("../interactors");
const { validateGetAllBookedAppointmentsInputs } = require("../validators/get-all-booked-appointments.validator");
const { validateGetAllAppointmentSlotsOfADayInputs } = require("../validators/get-all-appointment-slots-of-a-day.validator");

const router = express.Router();

// Route for creating an appointment
router.post("/", [validateCreateAppointmentTestInputs(), getCookiesMiddleware()], async (request, response, next) => {
	try {
		// Extracting request data
		const requestDTO = {
			date: request.body.date,
			time: request.body.time,
			slot: request.body.slot,
			authToken: response.locals.authToken // Getting authToken from response locals
		};

		// Calling interactor to create appointment
		const responseDTO = await createAppointmentInteractor(requestDTO);

		// Sending the response
		response.status(200).send(responseDTO);
	} catch (error) {
		// Handling errors
		console.error("Error in creating appointment :", error);

		next(error);
	}
});

// Route for getting all appointment slots of a day
router.get("/all-appointment-slots-of-a-day", [validateGetAllAppointmentSlotsOfADayInputs(), getCookiesMiddleware()], async (request, response, next) => {
	try {
		// Extracting request data
		const requestDTO = {
			date: request.query.date,
			authToken: response.locals.authToken // Getting authToken from response locals
		};

		// Calling interactor to get all appointment slots of a day
		const responseDTO = await getAllAppointmentSlotsOfADayInteractor(requestDTO);

		// Sending the response
		response.status(200).send(responseDTO);
	} catch (error) {
		// Handling errors
		console.error("Error in getting all appointments of a day :", error);

		next(error);
	}
});

router.get("/all-booked-appointments", [validateGetAllBookedAppointmentsInputs(), getCookiesMiddleware()], async (request, response, next) => {
	try {
		const requestDTO = {
			testType: request.query.testType,
			examResult: request.query.examResult,
			authToken: response.locals.authToken
		};

		const responseDTO = await getAllBookedAppointmentsInteractor(requestDTO);

		response.status(200).send(responseDTO);
	} catch (error) {
		// Handling errors
		console.error("Error in getting all booked appointments of a day :", error);

		next(error);
	}
});

router.get("/download-test-results", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		const requestDTO = {
			authToken: response.locals.authToken
		};

		const pdfBuffer = await downloadTestResultsInteractor(requestDTO);

		response.setHeader("content-type", "application/pdf");
		response.end(pdfBuffer);
	} catch (error) {
		// Handling errors
		console.error("Error in downloading test results :", error);

		next(error);
	}
});

router.get("/appointment-with-user", [validateGetAppointmentWithUserInputs(), getCookiesMiddleware()], async (request, response, next) => {
	try {
		// Extracting request data
		const requestDTO = {
			userId: request.query.userId,
			authToken: response.locals.authToken
		};

		const responseDTO = await getAppointmentWithUserInteractor(requestDTO);

		// Sending the response
		response.status(200).send(responseDTO);
	} catch (error) {
		// Handling errors
		console.error("Error in getting an appointment with user :", error);

		next(error);
	}
});

// Route for getting a specific appointment
router.get("/:id", [validateGetAppointmentInputs(), getCookiesMiddleware()], async (request, response, next) => {
	try {
		// Extracting request data
		const requestDTO = {
			appointmentId: request.params.id,
			authToken: response.locals.authToken
		};

		// Calling interactor to get appointment
		const responseDTO = await getAppointmentInteractor(requestDTO);

		// Sending the response
		response.status(200).send(responseDTO);
	} catch (error) {
		// Handling errors
		console.error("Error in getting an appointment :", error);

		next(error);
	}
});

module.exports = router;