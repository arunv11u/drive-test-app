const mongoose = require("mongoose");

// Schema for storing date of birth
const dateOfBirthSchema = new mongoose.Schema({
	date: { type: String, required: [true, "Date in date of birth is required"] }, // Day of birth
	month: { type: String, required: [true, "Month in date of birth is required"] }, // Month of birth
	year: { type: String, required: [true, "Year in date of birth is required"] } // Year of birth
}, { _id: false }); // Disabling _id field for subdocument

// Schema for storing car details
const carDetailsSchema = new mongoose.Schema({
	make: { type: String, required: [true, "Make in car details is required"] }, // Make of the car
	model: { type: String, required: [true, "Model in car details is required"] }, // Model of the car
	year: { type: String, required: [true, "Year in car details is required"] }, // Year of manufacture
	plateNumber: { type: String, required: [true, "Plate number in car details is required"] } // License plate number of the car
}, { _id: false }); // Disabling _id field for subdocument

// Main user schema
const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, "Username is required"] }, // Username of the user
	password: { type: String, required: [true, "Password is required"] }, // Password of the user
	userType: { type: String, enum: ["DRIVER", "EXAMINER", "ADMIN"], required: [true, "User type is required"] }, // Type of user
	firstName: { type: String, default: null }, // First name of the user
	lastName: { type: String, default: null }, // Last name of the user
	licenseNumber: { type: String, default: null }, // License number of the user (unique)
	age: { type: Number, default: null }, // Age of the user
	dateOfBirth: { type: dateOfBirthSchema }, // Date of birth of the user
	carDetails: { type: carDetailsSchema }, // Details of the user's car
	appointmentId: { type: String, default: null },
	testType: { type: String, enum: ["G2", "G"], default: null },
	examResult: { type: String, enum: ["Pass", "Fail"], default: null },
	comments: { type: String, default: null }
}, { timestamps: { createdAt: "creationDate", updatedAt: "lastModifiedDate" } }); // Adding timestamps for creation and update

// Indexes for fast lookup and unique constraints
userSchema.index({ username: 1 }, { unique: true }); // Indexing username for uniqueness
userSchema.index({ licenseNumber: 1 }, { partialFilterExpression: { licenseNumber: { $type: "string" } } }); // Indexing license number for partial filtering

// Exporting the mongoose model for users
module.exports = mongoose.model("users", userSchema);