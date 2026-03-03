import doctorAvailabilityModel from "../models/doctorAvailability.model.js";



class DoctorAvailabilityService {
    async CreateDoctorAvailability(doctor_id, day, start_time, end_time, slot_duration) {
        const availability = await doctorAvailabilityModel.create({
            doctor_id,
            day,
            start_time,
            end_time,
            slot_duration
        });
        return availability
    }

    async DoctorAvailabilityfindbyDoctorid(doctorId,today,next7Days) {
        const availability = await doctorAvailabilityModel.find({
            doctor_id: doctorId,
            date: { $gte: today, $lte: next7Days },
            is_active: true
        }).sort({ date: 1 });
        return availability
    }

    async DoctorAvailabilityfindOne (availabilityid, doctorid){
        const availability = await doctorAvailabilityModel.findOne({
            _id: availabilityid,
            doctor_id: doctorid
        });
        return availability
    }
}

export default DoctorAvailabilityService