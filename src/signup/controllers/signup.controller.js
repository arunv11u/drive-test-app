const express = require("express");
const { validateSignupInputs } = require("../validators/signup.validator");
const { signupInteractor } = require("../interactors/signup.interactor");

// Create a router instance
const router = express.Router();

// Handle POST requests to the signup endpoint
router.post("/", [validateSignupInputs()], async (request, response, next) => {
	try {
		// Extract username, password, and user type from the request body
		const requestDTO = {
			username: request.body.username,
			password: request.body.password,
			userType: request.body.userType
		};

		// Call the signup interactor to process the signup request
		const responseDTO = await signupInteractor(requestDTO);

		// Send the response with status 200 and the response DTO
		response.status(200).send(responseDTO);
	} catch (error) {
		// Log any errors and pass them to the error handling middleware
		console.error("Error in signing up :", error);
		next(error);
	}
});

// Export the router for use in other parts of the application
module.exports = router;