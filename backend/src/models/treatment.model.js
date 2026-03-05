import mongoose from "mongoose";


const treatmentSchema = new mongoose.Schema(
{
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },

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

    diagnosis: {
        type: String,
        required: true
    },

    symptoms: {
        type: String
    },

    medicines: [
        {
            medicineName: String,
            dosage: String,
            duration: String
        }
    ],

    testsRecommended: [
        {
            testName: String,
            notes: String
        }
    ],

    advice: {
        type: String
    },

    followUpDate: {
        type: Date
    }

},
{ timestamps: true }
);

const Treatmentmodel =  mongoose.model("Treatment", treatmentSchema);
export default Treatmentmodel;