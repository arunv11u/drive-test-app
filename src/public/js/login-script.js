"use strict";

// When the document is ready
$(() => {
	// Setting focus on the username field
	$("#username").focus();

	// Event listener for input in the username field
	$("#username").on("input", function () {
		$("#error").text("");
		validateUsername($(this).val());
	});

	// Event listener for input in the password field
	$("#password").on("input", function () {
		$("#error").text("");
		validatePassword($(this).val());
	});

	// Event listener for submitting the login form
	$("#loginForm").submit((event) => {
		event.preventDefault();

		// Disabling the login button to prevent multiple submissions
		$("#login-btn").prop("disabled", true);

		// Retrieving values from form fields
		const username = $("#username");
		const password = $("#password");

		// Validating username and password
		const isValidUsername = validateUsername(username.val());
		const isValidPassword = validatePassword(password.val());

		// If any input is invalid, return
		if (!isValidUsername || !isValidPassword) return;

		// Constructing credentials object
		const credentials = {
			username: username.val(),
			password: password.val()
		};

		// Making a POST request to log in the user
		axios.post("/login", credentials).then(response => {
			// Displaying a success message
			$("#toast-content").text("Login Successful");
			$('#toast').toast("show");

			// Redirecting to the home page after the toast is hidden
			$('#toast').on('hidden.bs.toast', function () {
				location.href = "/";
			});
		}).catch(error => {
			// Enabling the login button
			$("#login-btn").prop("disabled", false);

			// Displaying an error message
			$("#toast-content").html(`<span class="red-text">${error.response.data.error}</span>`);
			$('#toast').toast("show");
		});
	});
});

// Function to validate username
function validateUsername(username) {
	if (!username) {
		$("#username-error").text("Username is required");
		return false;
	}

	$("#username-error").text("");
	return true;
}

// Function to validate password
function validatePassword(password) {
	if (!password) {
		$("#password-error").text("Password is required");
		return false;
	}

	$("#password-error").text("");
	return true;
}