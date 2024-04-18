"use strict";

// When the document is ready
$(() => {
	// Checking if the logout button exists
	if ($("#logout")) {
		// Event listener for clicking the logout button
		$("#logout").on("click", (event) => {
			event.preventDefault();

			// Making a POST request to log out the user
			axios.post("/logout").then(response => {
				// Redirecting to the home page after successful logout
				location.href = "/";
			}).catch(error => {
				// Logging any errors to the console
				console.log(error);
			});
		});
	}
});