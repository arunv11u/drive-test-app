"use strict";

let appointmentSlotTiming;
let slotNumber;

$(() => {
	$("#appointment-date")
		.attr("min", `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${(new Date().getDate()).toString().padStart(2, "0")}`);

	$("#appointment-date").focus();

	$(".appointment-slot").addClass("disabled");

	$("#appointment-date").on("input", () => {
		setAppointmentDate($("#appointment-date").val());
	});

	$("#appointment-date").val(`${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, "0")}-${(new Date().getDate()).toString().padStart(2, "0")}`);
	setAppointmentDate($("#appointment-date").val());

	$("#appointmentForm").submit((event) => {
		event.preventDefault();

		const appointmentDate = $("#appointment-date");

		const isValidAppointmentDate = validateAppointmentDate(appointmentDate.val());
		const isValidAppointmentSlot = validateAppointmentSlot(appointmentSlotTiming);

		if (!isValidAppointmentDate || !isValidAppointmentSlot) return;

		const appointment = {
			date: appointmentDate.val(),
			time: appointmentSlotTiming,
			slot: slotNumber
		};

		$("#create-appointment").addClass("disabled");

		axios.post("/appointment", appointment).then(response => {
			$(".appointment-slot").removeClass("active");
			$("#create-appointment").removeClass("disabled");

			switch(appointment.time) {
				case "10:00 AM": {
					$("#slot1").addClass("disabled");
					break;
				}
		
				case "11:00 AM": {
					$("#slot2").addClass("disabled");
					break;
				}
		
				case "12:00 PM": {
					$("#slot3").addClass("disabled");
					break;
				}
		
				case "01:00 PM": {
					$("#slot4").addClass("disabled");
					break;
				}
		
				case "02:00 PM": {
					$("#slot5").addClass("disabled");
					break;
				}
		
				case "03:00 PM": {
					$("#slot6").addClass("disabled");
					break;
				}
		
				case "04:00 PM": {
					$("#slot7").addClass("disabled");
					break;
				}
		
				case "05:00 PM": {
					$("#slot8").addClass("disabled");
					break;
				}
		
				case "06:00 PM": {
					$("#slot9").addClass("disabled");
					break;
				}
		
				default: {
					$(".appointment-slot").removeClass("disabled");
				}
			}

			$("#toast-content").text("Appointment created successfully");
			$('#toast').toast("show");
		}).catch(error => {
			$("#create-appointment").removeClass("disabled");

			$("#toast-content").html(`<span class="red-text">${error.response.data.error}</span>`);
			$('#toast').toast("show");
		});
	});
});

function pickAppointmentTimeSlot(slotTiming) {
	$("#error").text("");
	$("#appointment-slot-error").text("");

	$(".appointment-slot").removeClass("active");

	switch(slotTiming) {
		case "10:00 AM": {
			$("#slot1").addClass("active");
			slotNumber = 1;

			break;
		}

		case "11:00 AM": {
			$("#slot2").addClass("active");
			slotNumber = 2;

			break;
		}

		case "12:00 PM": {
			$("#slot3").addClass("active");
			slotNumber = 3;

			break;
		}

		case "01:00 PM": {
			$("#slot4").addClass("active");
			slotNumber = 4;

			break;
		}

		case "02:00 PM": {
			$("#slot5").addClass("active");
			slotNumber = 5;

			break;
		}

		case "03:00 PM": {
			$("#slot6").addClass("active");
			slotNumber = 6;

			break;
		}

		case "04:00 PM": {
			$("#slot7").addClass("active");
			slotNumber = 7;

			break;
		}

		case "05:00 PM": {
			$("#slot8").addClass("active");
			slotNumber = 8;

			break;
		}

		case "06:00 PM": {
			$("#slot9").addClass("active");
			slotNumber = 9;

			break;
		}

		default: {
			$(".appointment-slot").removeClass("active");
		}
	}

	appointmentSlotTiming = slotTiming;
}

function validateAppointmentDate(appointmentDate) {
	if (!appointmentDate) {
		$("#appointment-date-error").text("Appointment date is required");

		return false;
	}

	const [appointmentYear, appointmentMonth, appointmentDay] = appointmentDate.split("-");
	if (new Date(appointmentYear, appointmentMonth, appointmentDay) < 
		new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
	) {
		$("#appointment-date-error").text("Appointment date is invalid");

		return false;
	}

	$("#appointment-date-error").text("");
	return true;
}

function validateAppointmentSlot(appointmentSlotTiming) {
	if (!appointmentSlotTiming) {
		$("#appointment-slot-error").text("Appointment slot is required");

		return false;
	}

	$("#appointment-slot-error").text("");
	return true;
}

function setAppointmentDate(date) {
	$("#error").text("");

	validateAppointmentDate(date);

	axios.get(`/appointment/all-appointment-slots-of-a-day?date=${$("#appointment-date").val()}`).then(response => {
		const appointmentSlots = response.data;

		$(".appointment-slot").removeClass("disabled");

		appointmentSlots.docs.forEach(slot => {
			if(slot.time === "10:00 AM") {
				$("#slot1").addClass("disabled");
			}

			if(slot.time === "11:00 AM") {
				$("#slot2").addClass("disabled");
			}

			if(slot.time === "12:00 PM") {
				$("#slot3").addClass("disabled");
			}

			if(slot.time === "01:00 PM") {
				$("#slot4").addClass("disabled");
			}

			if(slot.time === "02:00 PM") {
				$("#slot5").addClass("disabled");
			}

			if(slot.time === "03:00 PM") {
				$("#slot6").addClass("disabled");
			}

			if(slot.time === "04:00 PM") {
				$("#slot7").addClass("disabled");
			}

			if(slot.time === "05:00 PM") {
				$("#slot8").addClass("disabled");
			}

			if(slot.time === "06:00 PM") {
				$("#slot9").addClass("disabled");
			}
		});
	}).catch(error => {
		$("#toast-content").html(`<span class="red-text">${error.response.data.error}</span>`);
		$('#toast').toast("show");
	});
}