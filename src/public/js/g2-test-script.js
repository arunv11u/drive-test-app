"use strict";

let appointmentSlotTiming;
let availableSlotsOfADay;

// When the document is ready
$(() => {
  let user;
  let appointment;

  // Fetching user's driving test details
  axios
    .get("/driving-test")
    .then(async (response) => {
      user = response.data;

      // Populating form fields with user's data
      if (user.firstName) $("#first-name").val(user.firstName);
      if (user.lastName) $("#last-name").val(user.lastName);
      if (user.licenseNumber) $("#license-number").val(user.licenseNumber);
      if (user.age) $("#age").val(user.age);

      if (user.dateOfBirth) {
        const dateOfBirth = new Date(
          `${user.dateOfBirth.year}-${user.dateOfBirth.month}-${user.dateOfBirth.date}`
        );
        $("#dob").val(dateOfBirth.toISOString().split("T")[0]);
      }

      if (user.carDetails) {
        $("#make").val(user.carDetails.make);
        $("#model").val(user.carDetails.model);
        $("#year").val(user.carDetails.year);
        $("#plate-number").val(user.carDetails.plateNumber);
      }

      if (user.appointmentId) {
        const appointmentResponse = await axios.get(
          `/appointment/${user.appointmentId}`
        );
        appointment = appointmentResponse.data;

        $("#appointment-date").val(appointment.date);

        const availableSlotsResponse = await axios.get(
          `/appointment/all-appointment-slots-of-a-day?date=${appointment.date}`
        );
        availableSlotsOfADay = availableSlotsResponse.data;

        if (availableSlotsOfADay.count) {
          $("#appointment-slots").html("");

          availableSlotsOfADay.docs.forEach((appointmentSlot, index) => {
            if (appointmentSlot.isTimeSlotAvailable) {
              $("#appointment-slots").append(`<button type="button"
						class="btn btn-outline-dark text-uppercase appointment-slot"
						onclick="pickAppointmentTimeSlot('${appointmentSlot.time}')" id="slot${appointmentSlot.slot}">${appointmentSlot.time}</button>`);
            } else {
              $("#appointment-slots").append(`<button type="button"
								class="btn btn-outline-dark text-uppercase appointment-slot disabled"
								onclick="pickAppointmentTimeSlot('${appointmentSlot.time}')" id="slot${appointmentSlot.slot}">${appointmentSlot.time}</button>`);
            }
          });

          switch (appointment.time) {
            case "10:00 AM": {
              $("#slot1").removeClass("disabled");
              $("#slot1").addClass("active");

              break;
            }

            case "11:00 AM": {
              $("#slot2").removeClass("disabled");
              $("#slot2").addClass("active");

              break;
            }

            case "12:00 PM": {
              $("#slot3").removeClass("disabled");
              $("#slot3").addClass("active");

              break;
            }

            case "01:00 PM": {
              $("#slot4").removeClass("disabled");
              $("#slot4").addClass("active");

              break;
            }

            case "02:00 PM": {
              $("#slot5").removeClass("disabled");
              $("#slot5").addClass("active");

              break;
            }

            case "03:00 PM": {
              $("#slot6").removeClass("disabled");
              $("#slot6").addClass("active");

              break;
            }

            case "04:00 PM": {
              $("#slot7").removeClass("disabled");
              $("#slot7").addClass("active");

              break;
            }

            case "05:00 PM": {
              $("#slot8").removeClass("disabled");
              $("#slot8").addClass("active");

              break;
            }

            case "06:00 PM": {
              $("#slot9").removeClass("disabled");
              $("#slot9").addClass("active");

              break;
            }

            default: {
              $(".appointment-slot").removeClass("active");
            }
          }
        }
      }
    })
    .catch((error) => {
      $("#error").text(error.response.data.error);
    });

  // Setting focus on the first name field
  $("#first-name").focus();

  $(".appointment-slot").addClass("disabled");

  // Event listener for input in the first name field
  $("#first-name").on("input", function () {
    $("#error").text("");
    validateFirstName($(this).val());
  });

  // Event listener for input in the last name field
  $("#last-name").on("input", function () {
    $("#error").text("");
    validateLastName($(this).val());
  });

  // Event listener for input in the license number field
  $("#license-number").on("input", function () {
    $("#error").text("");
    validateLicenseNumber($(this).val());
  });

  // Event listener for input in the date of birth field
  $("#dob").on("input", function () {
    $("#error").text("");
    validateDob($(this).val());
  });

  // Event listener for input in the make field
  $("#make").on("input", function () {
    $("#error").text("");
    validateMake($(this).val());
  });

  // Event listener for input in the model field
  $("#model").on("input", function () {
    $("#error").text("");
    validateModel($(this).val());
  });

  // Event listener for input in the year field
  $("#year").on("input", function () {
    $("#error").text("");
    validateManufacturerYear($(this).val());
  });

  // Event listener for input in the plate number field
  $("#plate-number").on("input", function () {
    $("#error").text("");
    validatePlateNumber($(this).val());
  });

  $("#appointment-date").on("input", async () => {
    appointmentSlotTiming = undefined;
    await setAppointmentDate($("#appointment-date").val(), appointment);
  });

  // Event listener for submitting the G2 test form
  $("#g2TestForm").submit((event) => {
    event.preventDefault();

    // Retrieving values from form fields
    const firstName = $("#first-name");
    const lastName = $("#last-name");
    const licenseNumber = $("#license-number");
    const dob = $("#dob");
    const carDetailsMake = $("#make");
    const carDetailsModel = $("#model");
    const carDetailsYear = $("#year");
    const carDetailsPlateNumber = $("#plate-number");

    // Validating form inputs
    const isValidFirstName = validateFirstName(firstName.val());
    const isValidLastName = validateLastName(lastName.val());
    const isValidLicenseNumber = validateLicenseNumber(licenseNumber.val());
    const isValidDob = validateDob(dob.val());
    const isValidCarMake = validateMake(carDetailsMake.val());
    const isValidCarModel = validateModel(carDetailsModel.val());
    const isValidCarManufacturerYear = validateManufacturerYear(
      carDetailsYear.val()
    );
    const isValidCarPlateNumber = validatePlateNumber(
      carDetailsPlateNumber.val()
    );
    const isValidAppointmentSlot = validateAppointmentSlot(
      appointmentSlotTiming
    );

    // If any input is invalid, return
    if (
      !isValidFirstName ||
      !isValidLastName ||
      !isValidLicenseNumber ||
      !isValidDob ||
      !isValidCarMake ||
      !isValidCarModel ||
      !isValidCarManufacturerYear ||
      !isValidCarPlateNumber ||
      !isValidAppointmentSlot
    )
      return;

    $("#book-g2-test").prop("disabled", true);

    // Extracting year, month, and date from the date of birth
    const dateOfBirth = dob.val();
    const [year, month, date] = dateOfBirth.split("-");

    const appointmentDetails = availableSlotsOfADay.docs.find(
      (slot) => slot.time === appointmentSlotTiming
    );

    // Constructing user object
    const user = {
      firstName: firstName.val(),
      lastName: lastName.val(),
      licenseNumber: licenseNumber.val(),
      dateOfBirth: {
        date: date,
        month: month,
        year: year,
      },
      carDetails: {
        make: carDetailsMake.val(),
        model: carDetailsModel.val(),
        year: carDetailsYear.val(),
        plateNumber: carDetailsPlateNumber.val(),
      },
      appointmentId: appointmentDetails.id,
      testType: "G2",
    };

    // Making a POST request to submit G2 test details
    axios
      .post("/driving-test/g2", user)
      .then(async (response) => {
        $("#error").text("");

        $("#toast-content").text("G2 test details updated successfully");
        $("#toast").toast("show");

        $("#book-g2-test").prop("disabled", false);

        const appointmentResponse = await axios.get(
          `/appointment/${user.appointmentId}`
        );
        appointment = appointmentResponse.data;
      })
      .catch((error) => {
        $("#book-g2-test").prop("disabled", false);

        $("#toast-content").html(
          `<span class="red-text">${error.response.data.error}</span>`
        );
        $("#toast").toast("show");
      });
  });
});

// Function to validate first name
function validateFirstName(firstName) {
  if (!firstName) {
    $("#first-name-error").text("First Name is required");
    return false;
  }

  $("#first-name-error").text("");
  return true;
}

// Function to validate last name
function validateLastName(lastName) {
  if (!lastName) {
    $("#last-name-error").text("Last Name is required");
    return false;
  }

  $("#last-name-error").text("");
  return true;
}

// Function to validate license number
function validateLicenseNumber(licenseNumber) {
  if (!licenseNumber) {
    $("#license-number-error").text("License Number is required");
    return false;
  }

  if (!new RegExp("^[A-Za-z][A-Za-z0-9-]{0,14}$").test(licenseNumber)) {
    $("#license-number-error").text("License Number is invalid");
    return false;
  }

  $("#license-number-error").text("");
  return true;
}

// Function to validate date of birth
function validateDob(dob) {
  if (!dob) {
    $("#dob-error").text("Date Of Birth is required");
    return false;
  }

  $("#dob-error").text("");
  return true;
}

// Function to validate car make
function validateMake(make) {
  if (!make) {
    $("#make-error").text("Make of the car is required");
    return false;
  }

  $("#make-error").text("");
  return true;
}

// Function to validate car model
function validateModel(model) {
  if (!model) {
    $("#model-error").text("Model of the car is required");
    return false;
  }

  $("#model-error").text("");
  return true;
}

// Function to validate car manufacturer year
function validateManufacturerYear(year) {
  if (!year) {
    $("#year-error").text("Manufacture year of the car is required");
    return false;
  }

  $("#year-error").text("");
  return true;
}

// Function to validate car plate number
function validatePlateNumber(plateNumber) {
  if (!plateNumber) {
    $("#plate-number-error").text("Plate Number of the car is required");
    return false;
  }

  $("#plate-number-error").text("");
  return true;
}

function validateAppointmentDate(appointmentDate) {
  if (!appointmentDate) {
    $("#appointment-date-error").text("Appointment date is required");

    return false;
  }

  $("#appointment-date-error").text("");
  return true;
}

function validateAppointmentSlot(appointmentSlot) {
  if (!appointmentSlot) {
    $("#appointment-slot-error").text("Appointment slot is required");

    return false;
  }

  $("#appointment-slot-error").text("");
  return true;
}

async function setAppointmentDate(date, appointment) {
  $("#error").text("");

  validateAppointmentDate(date);

  const availableSlotsResponse = await axios.get(
    `/appointment/all-appointment-slots-of-a-day?date=${date}`
  );
  availableSlotsOfADay = availableSlotsResponse.data;

  if (availableSlotsOfADay.count) {
    $("#appointment-slots").html("");

    availableSlotsOfADay.docs.forEach((appointmentSlot, index) => {
      if (appointmentSlot.isTimeSlotAvailable) {
        $("#appointment-slots").append(`<button type="button"
				class="btn btn-outline-dark text-uppercase appointment-slot"
				onclick="pickAppointmentTimeSlot('${appointmentSlot.time}')" id="slot${appointmentSlot.slot}">${appointmentSlot.time}</button>`);
      } else {
        $("#appointment-slots").append(`<button type="button"
						class="btn btn-outline-dark text-uppercase appointment-slot disabled"
						onclick="pickAppointmentTimeSlot('${appointmentSlot.time}')" id="slot${appointmentSlot.slot}">${appointmentSlot.time}</button>`);
      }
    });

    if (appointment && appointment.date === date) {
      $("#appointment-slot-error").text("");

      switch (appointment.time) {
        case "10:00 AM": {
          $("#slot1").removeClass("disabled");
          $("#slot1").addClass("active");

          break;
        }

        case "11:00 AM": {
          $("#slot2").removeClass("disabled");
          $("#slot2").addClass("active");

          break;
        }

        case "12:00 PM": {
          $("#slot3").removeClass("disabled");
          $("#slot3").addClass("active");

          break;
        }

        case "01:00 PM": {
          $("#slot4").removeClass("disabled");
          $("#slot4").addClass("active");

          break;
        }

        case "02:00 PM": {
          $("#slot5").removeClass("disabled");
          $("#slot5").addClass("active");

          break;
        }

        case "03:00 PM": {
          $("#slot6").removeClass("disabled");
          $("#slot6").addClass("active");

          break;
        }

        case "04:00 PM": {
          $("#slot7").removeClass("disabled");
          $("#slot7").addClass("active");

          break;
        }

        case "05:00 PM": {
          $("#slot8").removeClass("disabled");
          $("#slot8").addClass("active");

          break;
        }

        case "06:00 PM": {
          $("#slot9").removeClass("disabled");
          $("#slot9").addClass("active");

          break;
        }

        default: {
          $(".appointment-slot").removeClass("active");
        }
      }
    }
  } else {
    $("#appointment-slots").html(`<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('10:00 AM')" id="slot1">10:00
		AM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('11:00 AM')" id="slot2">11:00
		AM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('12:00 PM')" id="slot3">12:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('01:00 PM')" id="slot4">01:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('02:00 PM')" id="slot5">02:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('03:00 PM')" id="slot6">03:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('04:00 PM')" id="slot7">04:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('05:00 PM')" id="slot8">05:00
		PM</button>
	<button type="button"
		class="btn btn-outline-dark text-uppercase appointment-slot disabled"
		onclick="pickAppointmentTimeSlot('06:00 PM')" id="slot9">06:00
		PM</button>`);
  }
}

function pickAppointmentTimeSlot(slotTiming) {
  $("#error").text("");
  $("#appointment-slot-error").text("");

  $(".appointment-slot").removeClass("active");

  switch (slotTiming) {
    case "10:00 AM": {
      $("#slot1").addClass("active");
      break;
    }

    case "11:00 AM": {
      $("#slot2").addClass("active");
      break;
    }

    case "12:00 PM": {
      $("#slot3").addClass("active");
      break;
    }

    case "01:00 PM": {
      $("#slot4").addClass("active");
      break;
    }

    case "02:00 PM": {
      $("#slot5").addClass("active");
      break;
    }

    case "03:00 PM": {
      $("#slot6").addClass("active");
      break;
    }

    case "04:00 PM": {
      $("#slot7").addClass("active");
      break;
    }

    case "05:00 PM": {
      $("#slot8").addClass("active");
      break;
    }

    case "06:00 PM": {
      $("#slot9").addClass("active");
      break;
    }

    default: {
      $(".appointment-slot").removeClass("active");
    }
  }

  appointmentSlotTiming = slotTiming;
}
