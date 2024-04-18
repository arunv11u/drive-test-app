const express = require("express");
const { getCookiesMiddleware } = require("../../utils/middlewares");
const { checkAuthorization } = require("../../authorization/authorization");

// Create a router instance
const router = express.Router();

/**
 * Route to render the index page.
 */
router.get("/", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		return response.render("index", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the G2 test page.
 */
router.get("/g2", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "DRIVER") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("g2-test", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the G test page.
 */
router.get("/g", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "DRIVER") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("g-test", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the login page.
 */
router.get("/login", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		try {
			let isLoggedIn = false;
			let userType;

			if (response.locals.authToken) isLoggedIn = true;

			if (isLoggedIn) {
				const payload = await checkAuthorization(response.locals.authToken);
				userType = payload.userType;
			}

			if (isLoggedIn) return response.render("already-logged-in", { isLoggedIn, userType });

			return response.render("login", { isLoggedIn });
		} catch (error) {
			console.log(error);
			throw error;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Route to render the signup page.
 */
router.get("/signup", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (isLoggedIn) return response.render("already-logged-in", { isLoggedIn, userType });

		return response.render("signup", { isLoggedIn });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.get("/appointment", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "ADMIN") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("appointment", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.get("/examiner", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "EXAMINER") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("examiner-booked-appointment-list", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.get("/examiner-update-test-result", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "EXAMINER") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("examiner-update-test-result", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.get("/test-results", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "ADMIN") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("admin-test-results", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

router.get("/view-test-result", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		if (!isLoggedIn || userType != "ADMIN") return response.render("unauthorized", { isLoggedIn, userType });

		return response.render("admin-view-test-result", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

/**
 * Middleware to render the page not found if the requested route is not defined.
 */
router.use("/**", [getCookiesMiddleware()], async (request, response, next) => {
	try {
		let isLoggedIn = false;
		let userType;

		if (response.locals.authToken) isLoggedIn = true;

		if (isLoggedIn) {
			const payload = await checkAuthorization(response.locals.authToken);
			userType = payload.userType;
		}

		return response.render("page-not-found", { isLoggedIn, userType });
	} catch (error) {
		console.log(error);
		throw error;
	}
});

// Export the router
module.exports = router;