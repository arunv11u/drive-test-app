"use strict";

$(() => {
	// Set focus on the username field when the page loads
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

	// Event listener for input in the confirm password field
	$("#confirm-password").on("input", function () {
		$("#error").text("");

		validateConfirmPassword($(this).val());
	});

	// Event listener for input in the user type field
	$("#user-type").on("input", function () {
		$("#error").text("");

		validateUserType($(this).val());
	});

	// Event listener for submitting the registration form
	$("#registrationForm").submit((event) => {
		event.preventDefault();

		$("#signup-btn").prop("disabled", true);

		const username = $("#username");
		const password = $("#password");
		const confirmPassword = $("#confirm-password");
		const userType = $("#user-type");

		// Validate form inputs
		const isValidUsername = validateUsername(username.val());
		const isValidPassword = validatePassword(password.val());
		const isValidConfirmPassword = validateConfirmPassword(confirmPassword.val());
		const isUserType = validateUserType(userType.val());

		// If any input is invalid, return
		if (!isValidUsername || !isValidPassword || !isValidConfirmPassword || !isUserType) return;

		// Construct user object
		const user = {
			username: username.val(),
			password: password.val(),
			userType: userType.val()
		};

		// Make a POST request to sign up the user
		axios.post("/signup", user).then(response => {
			$("#error").text("");

			// Show success message in a toast
			$("#toast-content").text("Registration Successful, please login to continue");
			$('#toast').toast("show");

			// Redirect to login page after the toast is hidden
			$('#toast').on('hidden.bs.toast', function () {
				location.href = "/login";
			});
		}).catch(error => {
			$("#signup-btn").prop("disabled", false);

			// Show error message in a toast
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

	if (password.length < 4) {
		$("#password-error").text("Password should be minimum 4 characters");

		return false;
	}

	$("#password-error").text("");
	return true;
}

// Function to validate confirm password
function validateConfirmPassword(confirmPassword) {
	if (!confirmPassword) {
		$("#confirm-password-error").text("Confirm password is required");

		return false;
	}

	if ($("#password").val() != confirmPassword) {
		$("#confirm-password-error").text("Password mismatch");

		return false;
	}

	$("#confirm-password-error").text("");
	return true;
}

// Function to validate user type
function validateUserType(userType) {
	if (!userType) {
		$("#user-type-error").text("User type is required");

		return false;
	}

	$("#user-type-error").text("");
	return true;
}