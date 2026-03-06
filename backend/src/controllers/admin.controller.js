import crypto from "crypto";
import DoctorInvite from "../models/doctorInvite.model.js";

export const inviteDoctor = async (req, res) => {
    try {
        const { email, department_id } = req.body;

        const token = crypto.randomBytes(32).toString("hex");

        const invite = await DoctorInvite.create({
            email,
            department_id,
            token,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        const registerLink = `${process.env.FRONTEND_URL}/doctor-register?token=${token}`;


        mailQueue.add("sendDoctorInvite", {
            email: email,
            registerLink: registerLink
        });
        res.status(201).json({
            success: true,
            message: "Doctor invite sent successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};