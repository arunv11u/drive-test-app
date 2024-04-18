const {
  AppointmentRepository,
} = require("../../appointments/repositories/appointment.repository");
const { checkAuthorization } = require("../../authorization/authorization"); // Importing the authorization check function
const { UserRepository } = require("../../users/repositories/user.repository"); // Importing the UserRepository

/**
 * Interactor function to handle booking a G driving test.
 * @param {object} requestDTO - Request data transfer object containing details necessary for booking the test.
 * @returns {object} - Response data transfer object containing details of the updated user after booking the test.
 */
async function bookGDrivingTestInteractor(requestDTO) {
  const responseDTO = {}; // Initialize response DTO
  const userRepository = UserRepository(); // Create an instance of UserRepository to interact with user data

  const appointmentRepository = AppointmentRepository();

  // Checking authorization using the provided auth token
  const userPayload = await checkAuthorization(requestDTO.authToken);

  // Fetching user details from the database using the user ID from the authorization payload
  const user = await userRepository.getWithId(userPayload.userId);
  const oldAppointmentId = user.appointmentId;

  // Updating user's car details with the provided details in the requestDTO
  user.carDetails = {
    make: requestDTO.carDetails.make,
    model: requestDTO.carDetails.model,
    year: requestDTO.carDetails.year,
    plateNumber: requestDTO.carDetails.plateNumber,
  };
  user.appointmentId = requestDTO.appointmentId;
  user.testType = "G";

  // Saving the updated user details in the database
  const updatedUser = await userRepository.bookGDriveTest(user);

  await appointmentRepository.markAppointmentSlotAsTaken(user.appointmentId);
  if (oldAppointmentId)
    await appointmentRepository.markAppointmentSlotAsFree(oldAppointmentId);

  // Populate the response DTO with updated user details
  responseDTO.id = updatedUser.id;
  responseDTO.firstName = updatedUser.firstName;
  responseDTO.lastName = updatedUser.lastName;
  responseDTO.licenseNumber = updatedUser.licenseNumber;
  responseDTO.age = updatedUser.age;
  responseDTO.dateOfBirth = updatedUser.dateOfBirth;
  responseDTO.carDetails = updatedUser.carDetails;
  responseDTO.appointmentId = updatedUser.appointmentId;
  responseDTO.testType = updatedUser.testType;

  return responseDTO; // Return the response DTO
}

module.exports = { bookGDrivingTestInteractor }; // Export the interactor function
