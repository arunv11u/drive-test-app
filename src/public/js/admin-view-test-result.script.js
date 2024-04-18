"use strict";

$(() => {
	console.log("Admin view test result page :");

	const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  axios
    .get("/appointment/appointment-with-user", {
      params: {
        userId: id,
      },
    })
    .then(function (response) {

          const data = response.data;
          const userData = data.user;
          const appointmentData = data.appointment;
          $('#license-number').val(userData.licenseNumber);
          $('#first-name').val(userData.firstName);
          $('#last-name').val(userData.lastName);
          $('#age').val(userData.age);
          $('#dob').val(userData.dateOfBirth);
          $('#make').val(userData.carDetails.make);
          $('#model').val(userData.carDetails.model);
          $('#year').val(userData.carDetails.year);
          $('#plate-number').val(userData.carDetails.plateNumber);
          $('#appointment-date').val(appointmentData.date);
          $('#appointment-slot').val(appointmentData.slot);

		  if(userData.examResult) {
			$("#exam-result").val(userData.examResult);
			$("#comments").val(userData.comments);
		  }
          
          // Enable the input fields after populating data
          $('input').prop('disabled', false);
    })
    .catch((error) => {
      console.log(error);
    });

});