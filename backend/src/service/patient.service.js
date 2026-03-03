import Patientmodel from '../models/patient.model.js';

class PatientService {

    async CreatePatient(user_id, phone_no, address, city, state, pincode, blood_group, description, emergency_contact_number) {
        const user = await Patientmodel.create({ user_id, phone_no, address, city, state, pincode, blood_group, description, emergency_contact_number })
        return user;
    }
}

export default new PatientService;






