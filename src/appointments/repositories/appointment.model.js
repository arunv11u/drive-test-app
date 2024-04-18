const mongoose = require("mongoose");

// Define the schema for appointments
const appointmentSchema = new mongoose.Schema({
    // Date of the appointment
	date: { type: String, required: [true, "Date is required"] },
    // Time of the appointment
	time: { type: String, required: [true, "Time is required"] },
    // Flag indicating whether the time slot is available
	isTimeSlotAvailable: { type: Boolean, default: true },
    // Slot number of the appointment
	slot: { type: Number, required: [true, "Slot is required"] }
}, {
    // Define timestamps for creation and last modification
    timestamps: { createdAt: "creationDate", updatedAt: "lastModifiedDate" }
});

// Create a compound index on date and time fields to enforce uniqueness
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

// Export the mongoose model for appointments
module.exports = mongoose.model("appointments", appointmentSchema);