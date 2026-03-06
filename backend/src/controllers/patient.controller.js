import AppointmentModel from "../models/appointment.model";


export const bookAppointment = async ({
    patientId,
    doctorId,
    appointmentDatetime,
    notes
}) => {

    const startOfWeek = new Date(appointmentDatetime);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const existingAppointment = await AppointmentModel.findOne({
        patientId,
        doctorId,
        appointmentDatetime: {
            $gte: startOfWeek,
            $lt: endOfWeek
        },
        status: { $ne: "cancelled" }
    });

    if (existingAppointment) {
        throw new Error(
            "You already have an appointment with this doctor this week"
        );
    }

    const appointment = await AppointmentModel.create({
        patientId,
        doctorId,
        appointmentDatetime,
        notes
    });

    return appointment;
};


export const cancelAppointment = async (appointmentId) => {

    const appointment = await AppointmentModel.findByIdAndUpdate(
        appointmentId,
        { status: "cancelled" },
        { new: true }
    );

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    return appointment;
};