const bcrypt = require("bcrypt");

/**
 * Class for handling password hashing, validation, and comparison.
 */
class PasswordChecker {

    /**
     * Generates a hash for the given password.
     * @param {string} password The password to be hashed.
     * @returns {Promise<string>} A promise resolving to the generated hash.
     */
    async generateHash(password) {
        return await bcrypt.hash(password, 10);
    }

    /**
     * Checks if a password matches the given hash.
     * @param {string} password The password to be checked.
     * @param {string} hash The hash to compare against.
     * @returns {Promise<boolean>} A promise resolving to true if the password matches the hash, false otherwise.
     */
    async isMatch(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Validates the password against a set of criteria.
     * @param {string} password The password to be validated.
     * @throws {GenericError} If the password does not meet the validation criteria.
     */
    validate(password) {
        const isValid = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-.;:'"<>=/?[\]{|}~])(?=.*[0-9]).{8,}$/)
            .test(password);

        if (!isValid) throw new GenericError({
            code: ErrorCodes.invalidPassword,
            error: new Error("Password is invalid"),
            errorCode: 400
        });
    }
}

module.exports = { PasswordChecker };