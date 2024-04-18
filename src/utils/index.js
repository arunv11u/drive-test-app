const cookiesModule = require("./cookie");
const corsModule = require("./cors");
const encrypterModule = require("./encrypter");
const jsonWebTokenModule = require("./json-web-token");
const mongodbConnectModule = require("./mongodb-connect");
const passwordCheckerModule = require("./password-checker");
const requestErrorHandlerModule = require("./request-error-handler");
const securityHeaderModule = require("./security-header");
const unhandledErrorHandlerModule = require("./unhandled-error-handler");
const pdfModule = require("./pdf");

/**
 * Module exports combining various middleware and utility modules for easier import.
 */
module.exports = {
	...cookiesModule, // Export cookie-related functionality
	...corsModule, // Export CORS-related functionality
	...encrypterModule, // Export encryption/decryption functionality
	...jsonWebTokenModule, // Export JSON Web Token functionality
	...mongodbConnectModule, // Export MongoDB connection functionality
	...passwordCheckerModule, // Export password checking/hashing functionality
	...requestErrorHandlerModule, // Export request error handling middleware
	...securityHeaderModule, // Export security header middleware
	...unhandledErrorHandlerModule, // Export unhandled error handling middleware
	...pdfModule
};