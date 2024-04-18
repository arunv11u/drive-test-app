/**
 * Constant representing the name of the authentication token cookie for booking drive tests.
 */
const bookDriveTestAuthToken = "bookdrivetest_auth";

/**
 * Class representing a Cookie object for handling cookies.
 */
class Cookie {
	/**
	 * Constructor for the Cookie class.
	 * Initializes default cookie options.
	 */
	constructor() {
		this._cookieOptions = {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "strict"
		};
	};

	/**
	 * Method to set a cookie in the response.
	 * @param {object} response The response object.
	 * @param {object} cookie The cookie object containing name and value.
	 * @param {object} cookieOptions Additional options for the cookie (optional).
	 */
	setCookie(response, cookie, cookieOptions = undefined) {
		if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
		else cookieOptions = this._cookieOptions;

		response.cookie(cookie.name, cookie.value, cookieOptions)
	};

	/**
	 * Method to retrieve cookies from the request.
	 * @param {object} request The request object.
	 * @returns {object} An object containing the extracted cookies.
	 */
	getCookies(request) {
		const cookies = request.cookies;

		if (!cookies) return {};

		const modCookies = {
			bookDriveTestAuthToken: cookies[bookDriveTestAuthToken]
		};

		return modCookies;
	};

	/**
	 * Method to clear a cookie from the response.
	 * @param {object} response The response object.
	 * @param {string} key The key of the cookie to clear.
	 * @param {object} cookieOptions Additional options for the cookie (optional).
	 */
	clear(response, key, cookieOptions = undefined) {
		if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
		else cookieOptions = this._cookieOptions;

		response.clearCookie(key, cookieOptions);
	};
};

/**
 * Exporting the bookDriveTestAuthToken constant and the Cookie class for use in other modules.
 */
module.exports = {
	bookDriveTestAuthToken,
	Cookie
};