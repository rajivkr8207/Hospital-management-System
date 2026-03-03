import mongoose from "mongoose";

const doctorAvailabilitySchema = new mongoose.Schema({

  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  start_time: {
    type: String,
    required: true
  },

  end_time: {
    type: String,
    required: true
  },

  slot_duration: {
    type: Number,
    required: true
  },

  is_active: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

doctorAvailabilitySchema.index({ doctor_id: 1, date: 1 });

export default mongoose.model("DoctorAvailability", doctorAvailabilitySchema);