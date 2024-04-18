"use strict";

$(document).ready(function () {
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

    $('#update-test-result').click(function (event) {
		event.preventDefault();

      const examResult = $('#exam-result').val();
      const comments = $('#comments').val();

      axios.put('/driving-test/update-test-result', {
		  userId: id,
          examResult: examResult,
          comments: comments
      })
      .then(function (response) {
          console.log('Test result updated successfully:', response.data);
      })
      .catch(function (error) {
          console.error('Error updating test result:', error);
          $('#update-test-result-error').text('Error updating test result. Please try again.');
      });
  });
});
