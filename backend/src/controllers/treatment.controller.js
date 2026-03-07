import AppointmentModel from "../models/appointment.model.js";
import Treatmentmodel from "../models/treatment.model.js";

export const createTreatment = async (req, res) => {
    try {

        const doctorId = req.user.id;
        const { appointmentId } = req.params;

        const {
            diagnosis,
            symptoms,
            medicines,
            testsRecommended,
            advice,
            followUpDate
        } = req.body;

        // check appointment
        const appointment = await AppointmentModel.findOne({
            _id: appointmentId,
            doctorId
        });

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        const treatment = await Treatmentmodel.create({
            appointmentId,
            patientId: appointment.patientId,
            doctorId,
            diagnosis,
            symptoms,
            medicines,
            testsRecommended,
            advice,
            followUpDate
        });

        res.status(201).json({
            success: true,
            data: treatment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



export const updateTreatment = async (req, res) => {
    try {

        const doctorId = req.user.id;
        const { treatmentId } = req.params;

        const treatment = await TreatmentModel.findOne({
            _id: treatmentId,
            doctorId
        });

        if (!treatment) {
            return res.status(404).json({
                message: "Treatment not found"
            });
        }

        const today = new Date();
        const createdDate = new Date(treatment.createdAt);

        if (today.toDateString() !== createdDate.toDateString()) {
            return res.status(403).json({
                message: "Treatment can only be updated on the same day"
            });
        }

        Object.assign(treatment, req.body);

        await treatment.save();

        res.status(200).json({
            success: true,
            data: treatment
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getTodayTreatments = async (req, res) => {

    try {

        const doctorId = req.user.id;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const treatments = await TreatmentModel.find({
            doctorId,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
            .populate("patientId", "name age gender")
            .populate("appointmentId");

        res.status(200).json({
            success: true,
            data: treatments
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};