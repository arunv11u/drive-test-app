/**
 * Importing the Cookie class from the "../cookie" module.
 */
const { Cookie } = require("../cookie");

/**
 * Middleware function to extract cookies from the request.
 * @returns {Function} Express middleware function.
 */
const getCookiesMiddleware = () => {
	return function (request, response, next) {
		try {			
			// Creating a new instance of the Cookie class
			const cookie = new Cookie();
			// Extracting cookies from the request
			const cookies = cookie.getCookies(request);

			// Extracting the authentication token from the cookies and storing it in response.locals
			const authToken = cookies.bookDriveTestAuthToken;
			response.locals.authToken = authToken;

			// Passing control to the next middleware
			next();
		} catch (error) {
			// Logging the error and throwing it with a custom error code
			console.log(error);
			throw { error: error.message, errorCode: 400 };
		}
	}
}

// Exporting the getCookiesMiddleware function
module.exports = {
	getCookiesMiddleware
};