const jwt = require("jsonwebtoken");

const secret = "jwt_secret";

/**
 * Class representing JSON Web Token functionality.
 */
class JSONWebToken {

	/**
	 * Create a new JSONWebToken instance.
	 */
	constructor() { }

	/**
	 * Sign data to generate a JSON Web Token.
	 * @param {object} data The data to be encoded into the token.
	 * @param {object} options (Optional) Additional options for token signing.
	 * @returns {Promise<string>} A promise that resolves to the generated token.
	 */
	async sign(data, options = undefined) {
		const token = await new Promise((resolve, reject) => {
			let jwtSignoptions = {};
			if (options) jwtSignoptions = options;

			jwt.sign(data, secret, jwtSignoptions,
				(error, encoded) => {
					if (error) return reject(error);

					if (!encoded) {
						throw new GenericError({
							code: ErrorCodes.internalError,
							error: new Error("Something went wrong while generating json web token"),
							errorCode: 500
						});
					}

					resolve(encoded);
				});
		});

		return token;
	}

	/**
	 * Verify a JSON Web Token and extract payload.
	 * @param {string} token The token to be verified.
	 * @returns {Promise<object>} A promise that resolves to the decoded payload.
	 */
	async verify(token) {
		const payload = await new Promise((resolve, reject) => {
			jwt.verify(token, secret, (error, decoded) => {
				if (error) return reject(error);

				if (!decoded) {
					throw new GenericError({
						code: ErrorCodes.internalError,
						error: new Error("Something went wrong while verifying json web token"),
						errorCode: 500
					});
				}

				const decodedPayload = decoded;

				const payload = {
					userId: decodedPayload.userId,
					userType: decodedPayload.userType
				};

				resolve(payload);
			});
		});

		return payload;
	}
}

module.exports = { JSONWebToken };