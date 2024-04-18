const { UserRepository } = require("../../users/repositories/user.repository");
const Appointment = require("./appointment.model");

// Repository function for managing appointments
function AppointmentRepository() {
  // Return an object containing repository functions
  return {
    // Function to create a new appointment
    create: async function (newAppointment) {
      // Save the new appointment to the database
      const appointment = await new Appointment(newAppointment).save();

      // Format and return the created appointment
      return formatAppointment(appointment);
    },
    // Function to retrieve all appointment slots for a given date
    getAllAppointmentSlotsOfADay: async function (date) {
      // Find all appointments for the specified date and sort them by slot
      const appointments = await Appointment.find({ date: date }, undefined, {
        sort: { slot: 1 },
      });

      // Format the appointments and return them
      const appointmentsEntities = appointments.map((appointment) =>
        formatAppointment(appointment)
      );
      return appointmentsEntities;
    },
    // Function to retrieve a specific appointment by its ID
    get: async function (id) {
      // Find the appointment by its ID
      const appointment = await Appointment.findOne({ _id: id });

      // Format and return the appointment
      const appointmentEntity = formatAppointment(appointment);
      return appointmentEntity;
    },
    // Function to mark an appointment slot as taken
    markAppointmentSlotAsTaken: async function (id) {
      // Update the appointment to mark the slot as taken
      await Appointment.updateOne(
        { _id: id },
        { $set: { isTimeSlotAvailable: false } }
      );
    },
    // Function to mark an appointment slot as free
    markAppointmentSlotAsFree: async function (id) {
      // Update the appointment to mark the slot as free
      await Appointment.updateOne(
        { _id: id },
        { $set: { isTimeSlotAvailable: true } }
      );
    },
    getAllBookedAppointments: async function (testType, examResult) {
      const userRepository = UserRepository();

      const appointmentIdsAndUserIds =
        await userRepository.getAllBookedAppointmentsIdsAndUserIdsWithTestType(
          testType,
		  examResult
        );
      console.log("appointmentIdsAndUserIds ::", appointmentIdsAndUserIds);

      const appointments = [];

      const bookedAppointmentPromises = appointmentIdsAndUserIds.map(
        async (appointmentIdAndUserId, index) => {
          const appointment = await this.get(
            appointmentIdAndUserId.appointment
          );
          const user = await userRepository.getWithId(
            appointmentIdAndUserId.user
          );

          console.log("appointment :: user :: index", appointment, user, index);
          appointments[index] = { appointment, user };
        }
      );
      await Promise.all(bookedAppointmentPromises);

      console.log("appointments ::", appointments);

      return appointments;
    },
    getAppointmentWithUser: async function (userId) {
      const userRepository = UserRepository();

      const user = await userRepository.getWithId(userId);
      const appointment = await this.get(user.appointmentId);

      return {
        user,
        appointment,
      };
    },
  };
}

// Function to format appointment data for response
function formatAppointment(appointment) {
  return {
    id: appointment._id.toString(),
    date: appointment.date,
    time: appointment.time,
    isTimeSlotAvailable: appointment.isTimeSlotAvailable,
    slot: appointment.slot,
  };
}

// Export the AppointmentRepository function
module.exports = { AppointmentRepository };
