import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    specialization: {
        type: String,
        required: true,
        trim: true
    },

    qualification: {
        type: String,
        required: true,
        trim: true
    },

    experience_years: {
        type: Number,
        required: true,
        min: 0
    },

    license_number: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },

    consultation_fee: {
        type: Number,
        required: true,
        min: 0
    },

    phone_number: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        trim: true
    },

    is_active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

// doctorSchema.index({ department_id: 1 });
// doctorSchema.index({ specialization: 1 });
// doctorSchema.index({ license_number: 1 });

const doctorModel =  mongoose.model("Doctor", doctorSchema);
export default doctorModel;