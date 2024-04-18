const { encryptData, decryptData } = require("../../utils/encrypter"); // Importing encryption functions
const { PasswordChecker } = require("../../utils/password-checker"); // Importing password checker utility
const User = require("./user.model"); // Importing user model

// UserRepository constructor function
function UserRepository() {
  // Object containing repository methods
  return {
    // Method to check if a user exists with the given username
    isUserExistsWithUsername: async function (username) {
      const user = await User.findOne({ username }).lean(); // Finding user by username

      // Returning true if user exists, otherwise false
      return !!user;
    },

    // Method to get user by ID
    getWithId: async function (userId) {
      const user = await User.findOne({ _id: userId }).lean(); // Finding user by ID

      // Returning user data in the desired format or null if user not found
      return user ? formatUser(user) : null;
    },

    // Method to get user by username
    getWithUsername: async function (username) {
      const user = await User.findOne({ username }).lean(); // Finding user by username

      // Returning user data in the desired format or null if user not found
      return user ? formatUser(user) : null;
    },

    // Method to save a new user
    save: async function (newUser) {
      if (newUser.password) {
        const passwordChecker = new PasswordChecker(); // Creating password checker instance
        newUser.password = await passwordChecker.generateHash(newUser.password); // Hashing password
      }

      if (newUser.licenseNumber)
        newUser.licenseNumber = encryptData(newUser.licenseNumber); // Encrypting license number

      // Creating and saving new user document
      const user = await new User(newUser).save();

      // Returning user data in the desired format
      return formatUser(user);
    },

    // Method to update user data for booking G drive test
    bookGDriveTest: async function (user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        {
          $set: {
            carDetails: user.carDetails,
            appointmentId: user.appointmentId,
            testType: user.testType,
			examResult: null,
			comments: null
          },
          $inc: {
            __v: 1,
          },
        }
      );

      // Returning updated user data in the desired format
      return formatUser(updatedUser);
    },

    // Method to update user data for booking G2 drive test
    bookG2DriveTest: async function (user) {
      if (user.licenseNumber)
        user.licenseNumber = encryptData(user.licenseNumber); // Encrypting license number

      const updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        {
          $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            licenseNumber: user.licenseNumber,
            age: user.age,
            dateOfBirth: user.dateOfBirth,
            carDetails: user.carDetails,
            appointmentId: user.appointmentId,
            testType: user.testType,
			examResult: null,
			comments: null
          },
          $inc: {
            __v: 1,
          },
        }
      ).lean();

      // Returning updated user data in the desired format
      return formatUser(updatedUser);
    },

    // Method to check if a license number already exists
    isLicenseNumberAlreadyExists: async function (licenseNumber) {
      // Finding a user with the given license number
      const user = await User.findOne({ licenseNumber });

      // Returning true if license number already exists, otherwise false
      return !!user;
    },

    getAllBookedAppointmentsIdsAndUserIdsWithTestType: async function (
      testType,
	  examResult
    ) {
      const query = { $and: [{ appointmentId: { $ne: null } }] };

      if (testType) query.$and.push({ testType: testType });
	  if (examResult) query.$and.push({ examResult: examResult });

      const users = await User.find(query);

      const appointmentIdsAndUserIds = users.map((user) => ({
        user: user._id.toString(),
        appointment: user.appointmentId.toString(),
      }));

      return appointmentIdsAndUserIds;
    },

    updateDriveTestResult: async function (userId, examResult, comments) {
		console.log("updateDriveTestResult :: userId, examResult, comments ::", userId, examResult, comments);
      await User.updateOne({ _id: userId }, { $set: { examResult, comments } });
    },
  };
}

// Helper function to format user data
function formatUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    userType: user.userType,
    firstName: user.firstName,
    lastName: user.lastName,
    licenseNumber: user.licenseNumber ? decryptData(user.licenseNumber) : null, // Decrypting license number if present
    age: user.age,
    dateOfBirth: user.dateOfBirth,
    carDetails: user.carDetails,
    password: user.password,
    appointmentId: user.appointmentId,
    examResult: user.examResult,
    comments: user.comments,
    testType: user.testType,
  };
}

// Exporting the UserRepository constructor function
module.exports = { UserRepository };
