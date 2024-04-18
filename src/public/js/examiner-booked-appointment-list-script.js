"use strict";

$(document).ready(function () {
	axios
		.get("/appointment/all-booked-appointments")
		.then(function (response) {
			const appointments = response.data.docs;
			const appointmentTableBody = $("#appointmentTableBody");
			console.log(appointments);
			appointments.forEach(function (appointment) {
				const formattedDateOfBirth = `${appointment.user.dateOfBirth.month}/${appointment.user.dateOfBirth.date}/${appointment.user.dateOfBirth.year}`;
				const appointmentItem = $("<tr>")
					.addClass("appointment-item")
					.click(function () {
						redirectToUpdateResultPage(appointment.user.id);
					});

				$("<td>")
					.text(appointment.user.licenseNumber)
					.appendTo(appointmentItem);
				$("<td>")
					.text(`${appointment.user.firstName} ${appointment.user.lastName}`)
					.appendTo(appointmentItem);
				$("<td>").text(formattedDateOfBirth).appendTo(appointmentItem);
				$("<td>")
					.text(appointment.user.carDetails.plateNumber)
					.appendTo(appointmentItem);
				$("<td>").text(appointment.user.testType).appendTo(appointmentItem);
				appointmentItem.appendTo(appointmentTableBody);
			});
		})
		.catch(function (error) {
			console.error("Error fetching appointments:", error);
		});

	$("#search-booked-appointments").on("click", () => {
		const testType = $("#search-test-type").val();
		console.log("testType ::", testType);
		axios
			.get(`/appointment/all-booked-appointments?testType=${testType}`,)
			.then(function (response) {
				const appointments = response.data.docs;
				const appointmentTableBody = $("#appointmentTableBody");
				appointmentTableBody.html("");
				console.log(appointments);
				appointments.forEach(function (appointment) {
					const formattedDateOfBirth = `${appointment.user.dateOfBirth.month}/${appointment.user.dateOfBirth.date}/${appointment.user.dateOfBirth.year}`;
					const appointmentItem = $("<tr>")
						.addClass("appointment-item")
						.click(function () {
							redirectToUpdateResultPage(appointment.user.id);
						});

					$("<td>")
						.text(appointment.user.licenseNumber)
						.appendTo(appointmentItem);
					$("<td>")
						.text(`${appointment.user.firstName} ${appointment.user.lastName}`)
						.appendTo(appointmentItem);
					$("<td>").text(formattedDateOfBirth).appendTo(appointmentItem);
					$("<td>")
						.text(appointment.user.carDetails.plateNumber)
						.appendTo(appointmentItem);
					$("<td>").text(appointment.user.testType).appendTo(appointmentItem);
					appointmentItem.appendTo(appointmentTableBody);
				});
			})
			.catch(function (error) {
				console.error("Error fetching appointments:", error);
			});
	});
});

function redirectToUpdateResultPage(userId) {
	console.log("redirectToUpdateResultPage called ::");
	location.href = "/examiner-update-test-result" + "?id=" + userId;
}
