import mongoose from "mongoose";

const doctorInviteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    expires_at: {
        type: Date,
        required: true
    },

    is_used: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const doctorInviteModel = mongoose.model("DoctorInvite", doctorInviteSchema);

export default doctorInviteModel