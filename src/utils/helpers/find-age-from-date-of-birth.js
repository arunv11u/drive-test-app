/**
 * Function to calculate age based on the date of birth.
 * @param {Date} dateOfBirth The date of birth of the person.
 * @returns {number} The calculated age.
 */
function findAgeFromDateOfBirth(dateOfBirth) {
    // Get the current date
    const currentDate = new Date();
    // Convert the date of birth string to a Date object
    const birthDate = new Date(dateOfBirth);

    // Calculate the difference in milliseconds between the current date and the birth date
    const difference = currentDate.getTime() - birthDate.getTime();

    // Calculate the age in years
    const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));

    return age;
}

// Export the findAgeFromDateOfBirth function
module.exports = { findAgeFromDateOfBirth };