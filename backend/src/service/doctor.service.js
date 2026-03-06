import doctorModel from "../models/doctor.model.js";

class DoctorService {


    async findDoctorInvite(token) {
        const invite = await DoctorInvite.findOne({ token });
        return invite
    }

    async FindDoctorUser(userid) {
        const user = await doctorModel.findOne({
            user_id: userid
        })
        return user
    }

    async CreateUserDoctor(userid, department_id, specialization, qualification, experience_years, license_number, consultation_fee, phone_number, bio) {
        const userdoctor = await doctorModel.create({
            user_id: userid,
            department_id: department_id,
            specialization,
            qualification,
            experience_years,
            license_number,
            consultation_fee,
            phone_number,
            bio
        })
        return userdoctor
    }
}

export default new DoctorService;





