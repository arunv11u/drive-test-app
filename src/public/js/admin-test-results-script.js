"use strict";

$(() => {
	console.log("Admin test results list page :");

	axios
		.get("/appointment/all-booked-appointments")
		.then(function (response) {
			const appointments = response.data.docs;
			const appointmentTableBody = $("#appointmentTableBody");
			console.log(appointments);
			appointments.forEach(function (appointment) {
				const appointmentItem = $("<tr>")
					.addClass("appointment-item")
					.click(function () {
						redirectToViewTestResultPage(appointment.user.id);
					});

				$("<td>")
					.text(appointment.user.licenseNumber)
					.appendTo(appointmentItem);
				$("<td>")
					.text(`${appointment.user.firstName} ${appointment.user.lastName}`)
					.appendTo(appointmentItem);
				$("<td>")
					.text(appointment.user.carDetails.plateNumber)
					.appendTo(appointmentItem);
				$("<td>").text(appointment.user.testType).appendTo(appointmentItem);

				const examResult = appointment.user.examResult ? appointment.user.examResult : "Pending";
				$("<td>").text(examResult).appendTo(appointmentItem);
				appointmentItem.appendTo(appointmentTableBody);
			});
		})
		.catch(function (error) {
			console.error("Error fetching appointments:", error);
		});

	$("#search-driving-test-results").on("click", () => {
		const examResult = $("#search-driving-test-input").val();

		const appointmentTableBody = $("#appointmentTableBody");
		appointmentTableBody.html("");

		axios
			.get("/appointment/all-booked-appointments?examResult=" + examResult)
			.then(function (response) {
				const appointments = response.data.docs;
				console.log(appointments);
				appointments.forEach(function (appointment) {
					const appointmentItem = $("<tr>")
						.addClass("appointment-item")
						.click(function () {
							redirectToViewTestResultPage(appointment.user.id);
						});

					$("<td>")
						.text(appointment.user.licenseNumber)
						.appendTo(appointmentItem);
					$("<td>")
						.text(`${appointment.user.firstName} ${appointment.user.lastName}`)
						.appendTo(appointmentItem);
					$("<td>")
						.text(appointment.user.carDetails.plateNumber)
						.appendTo(appointmentItem);
					$("<td>").text(appointment.user.testType).appendTo(appointmentItem);

					const examResult = appointment.user.examResult ? appointment.user.examResult : "Pending";
					$("<td>").text(examResult).appendTo(appointmentItem);
					appointmentItem.appendTo(appointmentTableBody);
				});
			})
			.catch(function (error) {
				console.error("Error fetching appointments:", error);
			});
	});

	$("#download-results").on("click", async () => {
		const pdfBufferResponse = await axios.get("/appointment/download-test-results", { responseType: "arraybuffer" });

		const pdfBuffer = pdfBufferResponse.data;

		downloadPDF(pdfBuffer, "drive-test-result.pdf");
	});
});

function redirectToViewTestResultPage(userId) {
	console.log("redirectToViewTestResultPage called ::");
	location.href = "/view-test-result" + "?id=" + userId;
}

function downloadPDF(pdfBuffer, fileName) {
	const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;

	link.download = fileName;

	link.click();

	URL.revokeObjectURL(url);
}