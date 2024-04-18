const { bookG2DrivingTestInteractor } = require("./book-g2-driving-test.interactor"); // Importing interactor for booking G2 driving test
const { getTestDetailsInteractor } = require("./get-test-details.interactor"); // Importing interactor for retrieving test details
const { bookGDrivingTestInteractor } = require("./book-g-driving-test.interactor"); // Importing interactor for booking G driving test
const { updateDriveTestResultInteractor } = require("./update-drive-test-result.interactor");

// Exporting all interactors for external use
module.exports = {
    bookG2DrivingTestInteractor,
    getTestDetailsInteractor,
    bookGDrivingTestInteractor,
	updateDriveTestResultInteractor
};
