import AuthService from "../service/auth.service.js";
import imageService from "../service/image.service.js";
import DoctorService from "../service/doctor.service.js";
import DoctorAvailabilityService from "../service/DoctorAvailability.server.js";

export const registerDoctorFromInvite = async (req, res) => {
    try {
        const {
            token,
            email,
            username,
            password,
            fullname,
            dob,
            gender,
            specialization,
            qualification,
            experience_years,
            license_number,
            consultation_fee,
            bio
        } = req.body;
        const { file } = req.file
        const invite = await DoctorService.findDoctorInvite(token);

        if (!invite || invite.is_used) {
            return res.status(400).json({ message: "Invalid or expired invite" });
        }

        if (email !== invite.email) {
            return res.status(400).json({ message: "Unauthorized email" });
        }
        const userexist = await AuthService.FindUser(username, email)
        if (userexist) {
            return res.status(404).json({
                message: 'user is already exist of username email'
            })
        }
        const imgkiturl = await imageService.CreateAvatar(file)

        const user = await AuthService.CreateUser(email, username, password, dob, gender, fullname, imgurl = imgkiturl.url)

        await DoctorService.CreateUserDoctor(
            user._id,
            invite.department_id,
            specialization,
            qualification,
            experience_years,
            license_number,
            consultation_fee,
            bio
        );
        invite.is_used = true;
        await invite.save();

        res.status(201).json({
            success: true,
            message: "Doctor registered successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateConsultationFee = async (req, res) => {
    try {
        const userId = req.user._id;
        const { consultation_fee } = req.body;

        if (consultation_fee === undefined) {
            return res.status(400).json({
                success: false,
                message: "consultation_fee is required"
            });
        }

        if (consultation_fee < 0) {
            return res.status(400).json({
                success: false,
                message: "consultation_fee must be a positive number"
            });
        }

        const doctor = await DoctorService.FindDoctorUser(userId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }

        doctor.consultation_fee = consultation_fee;
        await doctor.save();

        res.status(200).json({
            success: true,
            message: "Consultation fee updated successfully",
            data: {
                consultation_fee: doctor.consultation_fee
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};




/**
 * PUT /api/v1/doctors/me
 * Doctor can update own profile (except consultation_fee)
 */
export const updateDoctorProfile = async (req, res) => {
    const userId = req.user._id;
    try {
        const {
            email,
            username,
            fullname,
            dob,
            gender,
            specialization,
            qualification,
            experience_years,
            license_number,
            bio
        } = req.body;
        const doctor = await DoctorService.FindDoctorUser(userId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }

        const user = await AuthService.FindById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.email = email ?? user.email;
        user.username = username ?? user.username;
        user.fullname = fullname ?? user.fullname;
        user.dob = dob ?? user.dob;
        user.gender = gender ?? user.gender;

        await user.save();


        doctor.specialization = specialization ?? doctor.specialization;
        doctor.qualification = qualification ?? doctor.qualification;
        doctor.experience_years = experience_years ?? doctor.experience_years;
        doctor.license_number = license_number ?? doctor.license_number;
        doctor.bio = bio ?? doctor.bio;

        await doctor.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const createAvailability = async (req, res) => {
    try {
        const userid = req.user._id
        const { day, start_time, end_time, slot_duration } = req.body;

        const doctor = await DoctorService.FindDoctorUser(userid)
        if (!doctor) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }

        const availability = await DoctorAvailabilityService.CreateDoctorAvailability(
            doctor._id,
            day,
            start_time,
            end_time,
            slot_duration
        )

        res.status(201).json({
            success: true,
            message: "Availability created",
            data: availability
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDoctorNext7DaysAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);

        const availability = await DoctorAvailabilityService.DoctorAvailabilityfindbyDoctorid(doctorId, today, next7Days)

        res.status(200).json({
            success: true,
            count: availability.length,
            data: availability
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const availabilityid = req.params.id
        const userid = req.user._id
        const doctor = await DoctorService.FindDoctorUser(userid)

        const availability = await DoctorAvailabilityService.DoctorAvailabilityfindOne(availabilityid, doctor._id)

        if (!availability) {
            return res.status(404).json({ message: "Availability not found" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (availability.date < today) {
            return res.status(400).json({
                message: "Past availability cannot be updated"
            });
        }

        // Allow update only for future
        availability.start_time = req.body.start_time ?? availability.start_time;
        availability.end_time = req.body.end_time ?? availability.end_time;
        availability.slot_duration = req.body.slot_duration ?? availability.slot_duration;
        availability.is_active = req.body.is_active ?? availability.is_active;

        await availability.save();

        res.json({
            success: true,
            message: "Availability updated"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAvailability = async (req, res) => {
    try {
        const availabilityid = req.params.id

        const userid = req.user._id

        const doctor = await await DoctorService.FindDoctorUser(userid)

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }

        const availability = await DoctorAvailabilityService.DoctorAvailabilityfindOne(availabilityid, doctor._id)

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Availability not found"
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        next7Days.setHours(23, 59, 59, 999);

        if (availability.date < today || availability.date > next7Days) {
            return res.status(400).json({
                success: false,
                message: "You can only delete availability within next 7 days"
            });
        }

        await availability.deleteOne();

        res.status(200).json({
            success: true,
            message: "Availability deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};