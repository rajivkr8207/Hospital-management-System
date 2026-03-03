import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true
    },

    phone_no: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    state: {
        type: String,
        required: true,
        trim: true
    },

    pincode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Invalid pincode"]
    },

    blood_group: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },

    description: {
        type: String,
        trim: true
    },
    emergency_contact_number: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Invalid emergency contact number"]
    },

}, { timestamps: true });

const Patientmodel = mongoose.model("Patient", patientSchema);
export default Patientmodel;