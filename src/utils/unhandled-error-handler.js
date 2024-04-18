/**
 * Function to handle uncaught exceptions and unhandled rejections.
 * It logs the error to the console.
 */
const unhandledErrorHandler = () => {
    // Register event listeners for uncaught exceptions and unhandled rejections
    process.on("uncaughtException", (error) => {
        console.error(error);
    });

    process.on("unhandledRejection", (error) => {
        console.error(error);
    });
};

// Export the unhandledErrorHandler function
module.exports = { unhandledErrorHandler };