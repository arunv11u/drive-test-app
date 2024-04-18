/**
 * Middleware function to handle errors in HTTP requests.
 * @param {object} error The error object containing error details.
 * @param {object} request The HTTP request object.
 * @param {object} response The HTTP response object.
 * @param {function} next The next middleware function.
 */
function requestErrorHandler(error, request, response, next) {
    // Check if the error object contains error and errorCode properties
    if (error.error && error.errorCode) {
        // If error and errorCode properties exist, send response with specified status code and error message
        return response.status(error.errorCode).send({ error: error.error });
    }

    // If error object does not contain expected properties, send generic error response
    return response.status(500).send({ error: "Something went wrong!, please try again." });
}

// Export the requestErrorHandler middleware function
module.exports = { requestErrorHandler };