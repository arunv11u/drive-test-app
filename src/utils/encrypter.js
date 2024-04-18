const crypto = require('crypto');

// Configuration for encryption
const secretKey = "mysecret"; // Secret key for encryption
const secretIV = "secretIv"; // Initialization Vector (IV) for encryption
const encryptionMethod = "aes-256-cbc"; // Encryption method

// Generate encryption key
const key = crypto
    .createHash('sha512')
    .update(secretKey)
    .digest('hex')
    .substring(0, 32);

// Generate encryption IV
const encryptionIV = crypto
    .createHash('sha512')
    .update(secretIV)
    .digest('hex')
    .substring(0, 16);

/**
 * Function to encrypt data using AES-256-CBC encryption.
 * @param {string} data The data to be encrypted.
 * @returns {string} The encrypted data.
 */
function encryptData(data) {
    const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV);
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64'); // Encrypts data and converts to hex and base64
}

/**
 * Function to decrypt data encrypted with AES-256-CBC encryption.
 * @param {string} encryptedData The encrypted data to be decrypted.
 * @returns {string} The decrypted data.
 */
function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(encryptionMethod, key, encryptionIV);
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ); // Decrypts data and converts to utf8
}

module.exports = { encryptData, decryptData };