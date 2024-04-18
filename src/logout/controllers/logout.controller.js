const express = require("express");
const { getCookiesMiddleware } = require("../../utils/middlewares"); // Importing middleware for handling cookies
const { Cookie, bookDriveTestAuthToken } = require("../../utils"); // Importing Cookie utility

const router = express.Router(); // Creating a router instance

// Route for handling logout requests
router.post("/", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		const cookie = new Cookie(); // Creating a new instance of Cookie utility

		// Clearing the authentication token cookie from the response
		cookie.clear(response, bookDriveTestAuthToken);

		// Sending a success response
		response.status(200).send();
	} catch (error) {
		console.error("Error in logging out :", error);
		next(error); // Passing the error to the error handling middleware
	}
});

module.exports = router; // Exporting the router module