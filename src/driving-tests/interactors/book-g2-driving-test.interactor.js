// Importing necessary modules
const {
  AppointmentRepository,
} = require("../../appointments/repositories/appointment.repository");
const { checkAuthorization } = require("../../authorization/authorization");
const { UserRepository } = require("../../users/repositories/user.repository");
const { findAgeFromDateOfBirth } = require("../../utils/helpers");

// Asynchronous function to handle booking G2 driving test
async function bookG2DrivingTestInteractor(requestDTO) {
  // Initializing response DTO
  const responseDTO = {};
  // Creating an instance of UserRepository
  const userRepository = UserRepository();

  const appointmentRepository = AppointmentRepository();

  // Authorizing the request using the provided auth token
  const userPayload = await checkAuthorization(requestDTO.authToken);
  // Fetching user details from the database using the user ID from the authorization payload
  const user = await userRepository.getWithId(userPayload.userId);
  const oldAppointmentId = user.appointmentId;

  // Updating user details with the provided data from the requestDTO
  user.firstName = requestDTO.firstName;
  user.lastName = requestDTO.lastName;
  user.licenseNumber = requestDTO.licenseNumber;
  user.dateOfBirth = {
    date: requestDTO.dateOfBirth.date,
    month: requestDTO.dateOfBirth.month,
    year: requestDTO.dateOfBirth.year,
  };
  user.carDetails = {
    make: requestDTO.carDetails.make,
    model: requestDTO.carDetails.model,
    year: requestDTO.carDetails.year,
    plateNumber: requestDTO.carDetails.plateNumber,
  };
  user.appointmentId = requestDTO.appointmentId;
  user.testType = requestDTO.testType;

  // Calculating age from date of birth using helper function
  const age = findAgeFromDateOfBirth(
    new Date(
      parseInt(requestDTO.dateOfBirth.year),
      parseInt(requestDTO.dateOfBirth.month),
      parseInt(requestDTO.dateOfBirth.date)
    )
  );

  // Checking if age is valid for booking a driving test
  if (age < 16)
    throw {
      error: "Test taker should be at least 16 years old",
      errorCode: 400,
    };
  if (age > 150)
    throw {
      error: "Test taker should be less than 150 years old",
      errorCode: 400,
    };

  // Adding age to the user object
  user.age = age;

  // Checking if license number already exists in the repository
  const isLicenseNumberAlreadyExists =
    await userRepository.isLicenseNumberAlreadyExists(requestDTO.licenseNumber);
  if (isLicenseNumberAlreadyExists)
    throw { error: "License Number already exists", errorCode: 403 };

  // Saving the new user
  const updatedUser = await userRepository.bookG2DriveTest(user);

  await appointmentRepository.markAppointmentSlotAsTaken(user.appointmentId);
  if (oldAppointmentId)
    await appointmentRepository.markAppointmentSlotAsFree(oldAppointmentId);

  // Creating the response DTO with user details
  responseDTO.id = updatedUser.id;
  responseDTO.firstName = updatedUser.firstName;
  responseDTO.lastName = updatedUser.lastName;
  responseDTO.licenseNumber = updatedUser.licenseNumber;
  responseDTO.age = updatedUser.age;
  responseDTO.dateOfBirth = updatedUser.dateOfBirth;
  responseDTO.carDetails = updatedUser.carDetails;
  responseDTO.testType = updatedUser.testType;

  // Returning the response DTO
  return responseDTO;
}

// Exporting the function for external use
module.exports = { bookG2DrivingTestInteractor };
