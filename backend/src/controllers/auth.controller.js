
import AuthService from "../service/auth.service.js"
import patientService from "../service/patient.service.js";
import imageService from "../service/image.service.js";
import GenratePasswordHash from "../utils/GenratePasswordHash.js";
import GenrateTokenByEmail from "../utils/GenrateTokenByEmail.js";
import { mailQueue } from "../queues/mail.queue.js";
import { imageQueue } from "../queues/image.queue.js";
import DoctorService from "../service/doctor.service.js";
import { sendResetPasswordEmail } from "../service/email.service.js";



export const RegisterUser = async (req, res) => {
    const { email, username, password, dob, gender, fullname, phone_no, address, city, state, pincode, blood_group, description, emergency_number } = req.body
    const file = req.file
    const userexist = await AuthService.FindUser(username, email)
    if (userexist) {
        return res.status(404).json({
            message: 'user is already exist of username email'
        })
    }
    const token = await GenrateTokenByEmail(email)
    const verificationToken = token;
    const verificationTokenExpire = Date.now() + 3600000;
    const user = await AuthService.CreateUser(email, username, password, dob, gender, fullname, verificationToken, verificationTokenExpire)
    const user_id = user._id
    const emergency_contact_number = emergency_number
    await patientService.CreatePatient(user_id, phone_no, address, city, state, pincode, blood_group, description, emergency_contact_number)

    mailQueue.add("verifyMail", {
        email: email,
        name: fullname,
        hashtoken: token
    });
    if (file) {
        imageQueue.add("uploadAvatar", {
            userId: user._id,
            file
        })

    }
    return res.status(201).json({
        message: "User is created successfully",
    })
}
export const LoginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await AuthService.FindUserByUsername(username)
    if (!user) {
        return res.status(404).json({
            message: 'user is not exist of username and email'
        })
    }
    if (!user.isActive) {
        return res.status(403).json({
            message: 'Your account is inactive. Please Verify you account'
        })
    }
    const isMatch = await user.ComparePassword(password)
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
    const gentoken = await user.GenrateToken()
    res.cookie('hospital', gentoken);
    return res.status(200).json({
        message: "Login successful",
        user: {
            username: user.username,
            id: user._id,
            role: user.role
        }
    });
}
export const ReSendVerifyEmail = async (req, res) => {
    const email = req.body.email
    const user = await AuthService.FindUserByEmail(email)
    if (!user) {
        return res.status(400).json({
            message: 'user is not exist of username and email'
        })
    }
    if (user.isActive) {
        return res.status(400).json({
            message: 'your account is already verified'
        })
    }
    const token = await GenrateTokenByEmail(email)

    await AuthService.ReGenrateTokenSave(user._id, token)
    mailQueue.add("verifyMail", {
        email: email,
        name: user.fullname,
        hashtoken: token
    });
    return res.status(200).json({
        message: "check your email",
    });
}


export const VerifyAccount = async (req, res) => {
    const token = req.query.token;
    const VerifyToken = await AuthService.VerifyToken(token)
    if (!VerifyToken) {
        return res.status(403).json({
            message: "your verification token is expire",
        })
    }
    await AuthService.VerifyisActive(VerifyToken._id)
    return res.status(200).json({
        message: "your verification token is verify",
    })
}

export const ForgetPassword = async (req, res) => {
    const { email } = req.body
    const user = await AuthService.FindUserByEmail(email)
    if (!user) {
        return res.status(404).json({
            message: 'user is not exist of username and email'
        })
    }
    const token = await GenrateTokenByEmail(email)
    await sendResetPasswordEmail(user.email, user.fullname, token)
    await AuthService.ForgetPasswordTokenSave(user._id, token)
    return res.status(200).json({
        message: "Forgetpassword send on email",
    })
}

export const VerifyForgetPassword = async (req, res) => {
    const token = req.query.token
    const password = req.body.password
    const user = await AuthService.VerifyForgetPasswordToken(token)
    if (!user) {
        return res.status(404).json({
            message: 'token is expire'
        })
    }
    const hashpassword = await GenratePasswordHash(password)
    await AuthService.VerifyForgetPasswordSave(user._id, hashpassword)
    return res.status(200).json({
        message: "Forgetpassword send on email",
    })
}



export const ProfileUser = async (req, res) => {
    const userid = req.user.id
    const role = req.user.role
    const user = await AuthService.FindById(userid)
    if (!user) {
        return res.status(400).json({
            message: 'user is not exist of this username and email'
        })
    }
    let userdata = null
    if (role == "DOCTOR") {
        const usersdoc = await DoctorService.FindDoctorUser(userid)
        userdata = usersdoc
    }
    if (role == 'PATIENT') {
        const userpatient = await patientService.FindPatientUser(userid)
        userdata = userpatient
    }

    return res.status(200).json({
        message: "profile fetch successfully",
        user,
        userdata
    })
}



export const updateProfilePhoto = async (req, res) => {
    try {
        const { file } = req.file;
        const userId = req.user._id;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Photo is required"
            });
        }
        const user = await AuthService.FindById(userId)


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const imgurl = await imageService.CreateAvatar(file)

        user.photo = imgurl.url;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile photo updated successfully",
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
 * PATCH /api/auth/me/change-password
 * User can change own password
 */
export const changeUserPassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        const userId = req.user._id;

        if (!current_password || !new_password) {
            return res.status(400).json({
                success: false,
                message: "Both current and new password are required"
            });
        }

        const user = await AuthService.FindById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await user.ComparePassword(current_password)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await GenratePasswordHash(new_password)
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const get_me = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message
        });
    }
};

export const LogoutUser = async (req, res) => {
    try {
        // The cookie name should match the one used in LoginUser, which is 'hospital'
        res.clearCookie('hospital', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict'
        });
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during logout",
            error: error.message
        });
    }
};