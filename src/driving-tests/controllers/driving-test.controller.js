// Importing necessary modules and functions
const express = require("express");
const router = express.Router();
const {
  validateBookG2DrivingTestInputs,
  validateBookGDrivingTestInputs,
  validateUpdateDriveTestResultInputs,
} = require("../validators"); // Importing input validation functions
const {
  bookG2DrivingTestInteractor,
  bookGDrivingTestInteractor,
  getTestDetailsInteractor,
  updateDriveTestResultInteractor,
} = require("../interactors"); // Importing business logic interactors
const { getCookiesMiddleware } = require("../../utils/middlewares"); // Importing middleware function

// Route to book a G2 driving test
router.post(
  "/g2",
  [validateBookG2DrivingTestInputs(), getCookiesMiddleware()],
  async (request, response, next) => {
    try {
      // Extracting request data
      const requestDTO = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        licenseNumber: request.body.licenseNumber,
        dateOfBirth: {
          date: request.body.dateOfBirth.date,
          month: request.body.dateOfBirth.month,
          year: request.body.dateOfBirth.year,
        },
        carDetails: {
          make: request.body.carDetails.make,
          model: request.body.carDetails.model,
          year: request.body.carDetails.year,
          plateNumber: request.body.carDetails.plateNumber,
        },
        appointmentId: request.body.appointmentId,
        testType: request.body.testType,
        authToken: response.locals.authToken, // Getting authToken from response locals
      };

      // Calling the interactor to book the G2 driving test
      const responseDTO = await bookG2DrivingTestInteractor(requestDTO);

      // Sending the response
      response.status(200).send(responseDTO);
    } catch (error) {
      // Handling errors
      console.error("Error in booking G2 driving test :", error);
      next(error);
    }
  }
);

// Route to book a G driving test
router.put(
  "/g",
  [validateBookGDrivingTestInputs(), getCookiesMiddleware()],
  async (request, response, next) => {
    try {
      // Extracting request data
      const requestDTO = {
        carDetails: {
          make: request.body.carDetails.make,
          model: request.body.carDetails.model,
          year: request.body.carDetails.year,
          plateNumber: request.body.carDetails.plateNumber,
        },
        appointmentId: request.body.appointmentId,
        testType: request.body.testType,
        authToken: response.locals.authToken, // Getting authToken from response locals
      };

      // Calling the interactor to book the G driving test
      const responseDTO = await bookGDrivingTestInteractor(requestDTO);

      // Sending the response
      response.status(200).send(responseDTO);
    } catch (error) {
      // Handling errors
      console.error("Error in booking G driving test :", error);
      next(error);
    }
  }
);

router.put(
  "/update-test-result",
  [validateUpdateDriveTestResultInputs(), getCookiesMiddleware()],
  async (request, response, next) => {
    try {
      // Extracting request data
      const requestDTO = {
		userId: request.body.userId,
        examResult: request.body.examResult,
        comments: request.body.comments,
        authToken: response.locals.authToken, // Getting authToken from response locals
      };

      await updateDriveTestResultInteractor(requestDTO);

      // Sending the response
      response.status(200).send();
    } catch (error) {
      // Handling errors
      console.error("Error in updating drive test result :", error);
      next(error);
    }
  }
);

// Route to get test details with license number
router.get("/", [getCookiesMiddleware()], async (request, response, next) => {
  try {
    // Extracting request data
    const requestDTO = {
      authToken: response.locals.authToken, // Getting authToken from response locals
    };

    // Calling the interactor to get test details
    const responseDTO = await getTestDetailsInteractor(requestDTO);

    // Sending the response
    response.status(200).send(responseDTO);
  } catch (error) {
    // Handling errors
    console.error("Error in getting test details :", error);
    next(error);
  }
});

// Exporting the router module
module.exports = router;
