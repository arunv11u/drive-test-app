const express = require("express");
const { loginInteractor } = require("../interactors/login.interactor"); // Importing login interactor
const { validateLoginInputs } = require("../validators/login.validator"); // Importing validator for login inputs
const { Cookie, bookDriveTestAuthToken } = require("../../utils/cookie"); // Importing Cookie utility

const router = express.Router(); // Creating a router instance

// Route for handling login requests
router.post("/", [validateLoginInputs()], async (request, response, next) => {
	try {
		const cookie = new Cookie(); // Creating a new instance of Cookie utility
		const requestDTO = {
			username: request.body.username,
			password: request.body.password
		};

		// Calling the login interactor with the provided login credentials
		const responseDTO = await loginInteractor(requestDTO);

		// Setting the authentication token in a cookie
		cookie.setCookie(response, { name: bookDriveTestAuthToken, value: responseDTO.authToken });
		delete responseDTO.authToken; // Removing authToken from the response DTO for security

		// Sending the response with the authentication token
		response.status(200).send(responseDTO);
	} catch (error) {
		console.error("Error in logging in :", error);
		next(error); // Passing the error to the error handling middleware
	}
});

module.exports = router; // Exporting the router module