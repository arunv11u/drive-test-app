/**
 * Importing the findAgeFromDateOfBirth function from the module.
 */
const { findAgeFromDateOfBirth } = require("./find-age-from-date-of-birth");
const { getTodayDateStr } = require("./date.helper");

// Exporting the findAgeFromDateOfBirth function
module.exports = { 
	findAgeFromDateOfBirth,
	getTodayDateStr
};