/**
 * Function to provide CORS (Cross-Origin Resource Sharing) options.
 * @param {object} request The incoming HTTP request object.
 * @param {function} callback The callback function to be called with the CORS options.
 */
const corsOptions = function (request, callback) {
    // Define the CORS options
    const corsOptions = {
        methods: ["POST", "GET", "PATCH", "DELETE", "PUT", "OPTIONS"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
        origin: "*" // Allow requests from any origin (change as needed for specific origin policies)
    };

    // Call the callback function with the CORS options
    callback(null, corsOptions);
};

// Export the corsOptions function
module.exports = { corsOptions };