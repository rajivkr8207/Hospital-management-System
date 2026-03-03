import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    department_code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },

    description: {
        type: String,
        trim: true
    },

    is_active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

/* Indexing for faster search */
// departmentSchema.index({ name: 1 });
// departmentSchema.index({ department_code: 1 });

const DepartmentModel =  mongoose.model("Department", departmentSchema);
export default DepartmentModel;