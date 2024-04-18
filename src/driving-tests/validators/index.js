const { validateBookG2DrivingTestInputs } = require("./book-g2-driving-test.validator"); // Importing validator for booking G2 driving test inputs
const { validateBookGDrivingTestInputs } = require("./book-g-driving-test.validator"); // Importing validator for booking G driving test inputs
const { validateUpdateDriveTestResultInputs } = require("./update-drive-test-result.validator");

// Exporting both validator functions for external use
module.exports = {
    validateBookG2DrivingTestInputs,
    validateBookGDrivingTestInputs,
	validateUpdateDriveTestResultInputs
};