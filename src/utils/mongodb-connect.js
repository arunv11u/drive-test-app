const mongoose = require("mongoose");

// MongoDB connection string
const connectionString = "mongodb+srv://avaradharajalu6434:Y74OW7I8f2tgChq1@conestoga.a2hwznc.mongodb.net/book-drive-test?retryWrites=true&w=majority";

/**
 * Function to establish connection to the MongoDB database.
 */
async function dbConnect() {
    try {
        // Connect to the MongoDB database using the provided connection string
        await mongoose.connect(connectionString);
        console.log("Database Connected!");
    } catch (error) {
        // Handle any errors that occur during database connection
        console.error("Error connecting to the database:", error);
    }
}

// Export the dbConnect function
module.exports = { dbConnect };