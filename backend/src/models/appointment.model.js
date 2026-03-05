import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },

        appointmentDatetime: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DoctorAvailability"
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending"
        },

        notes: {
            type: String
        }

    },
    { timestamps: true }
);

const AppointmentModel =  mongoose.model("Appointment", appointmentSchema);
export default AppointmentModel;