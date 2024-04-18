// Importing required modules
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Importing utility functions
const {
	setSecurityHeaders,
	corsOptions,
	requestErrorHandler
} = require("./utils");

// Function to set up routes and middleware for the Express app
function listen(app) {
	// Disable x-powered-by header
	app.disable("x-powered-by");
	// Enable trust proxy for secure headers
	app.enable("trust proxy");
	// Set security headers middleware
	// app.use(setSecurityHeaders);
	// Enable CORS with options
	app.use(cors(corsOptions));

	// Parse cookies.
	app.use(cookieParser());

	// Parse JSON bodies
	app.use(express.json());
	// Parse URL-encoded bodies
	app.use(express.urlencoded({ extended: true }));

	// Serve static files from the public directory
	app.use(express.static(path.resolve(__dirname, "public")));

	// Set up views directory and view engine to use EJS
	app.set("views", path.join(__dirname, "views"));
	app.set("view engine", "ejs");

	// Middleware to log requests
	app.use((req, res, next) => {
		if (req.method !== "OPTIONS")
			console.log(`${req.method} : ${req.originalUrl}`);

		next();
	});

	// Health check endpoint
	app.use("/health-check", (req, res) => {
		return res.status(200).send();
	});

	// Importing controllers for different routes
	const pageController = require("./views/controllers/page.controller");
	const drivingTestController = require("./driving-tests/controllers/driving-test.controller");
	const loginController = require("./login/controllers/login.controller");
	const signupController = require("./signup/controllers/signup.controller");
	const logoutController = require("./logout/controllers/logout.controller");
	const appointmentController = require("./appointments/controllers/appointment.controller");

	// Mounting routes
	app.use("/driving-test", drivingTestController);
	app.use("/login", loginController);
	app.use("/logout", logoutController);
	app.use("/signup", signupController);
	app.use("/appointment", appointmentController);
	app.use("/", pageController); // Controller to render HTML pages

	// Error handling middleware
	app.use(requestErrorHandler);
}

// Export the listen function
module.exports = { listen };