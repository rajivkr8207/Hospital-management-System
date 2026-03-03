import Usermodel from '../models/user.model.js'

class AuthService {

    async CreateUser(email, username, password, dob, gender, fullname, photo, role = 'PATIENT') {
        console.log(photo);
        const user = await Usermodel.create({ email, username, password, dob, gender, fullname, photo, role })
        return user;
    }

    async FindUser(username, email) {
        const user = await Usermodel.findOne({
            username,
            email
        })
        return user
    }

    async VerifyToken(token) {
        const verify = await Usermodel.findOne({
            verificationToken: token,
            verificationTokenExpire: { $gt: Date.now() }
        })
        return verify
    }

    async VerifyisActive(id) {
        const active = await Usermodel.findByIdAndUpdate(id, {
            isActive: true,
            verificationToken: null,
            verificationTokenExpire: null,
        })
        return active
    }

    async FindUserByUsername(username) {
        const user = await Usermodel.findOne({
            username
        }).select('+password')
        return user
    }

    async ReGenrateTokenSave(id, token) {
        const user = await Usermodel.findByIdAndUpdate(id, {
            verificationToken: token,
            verificationTokenExpire: Date.now() + 3600000
        })
        return user
    }

    async ForgetPasswordTokenSave(id, token) {
        const user = await Usermodel.findByIdAndUpdate(id, {
            ForgetPasswordToken: token,
            ForgetPasswordTokenExpire: Date.now() + 3600000
        })
        return user
    }

    async VerifyForgetPasswordToken(token) {
        const verify = await Usermodel.findOne({
            ForgetPasswordToken: token,
            ForgetPasswordTokenExpire: { $gt: Date.now() }
        })
        return verify
    }

    async VerifyForgetPasswordSave(id, password) {
        const passwordSave = await Usermodel.findByIdAndUpdate(id, {
            password: password,
            ForgetPasswordToken: null,
            ForgetPasswordTokenExpire: null,
        })
        return passwordSave
    }

    async FindUserByEmail(email) {
        const user = await Usermodel.findOne({
            email
        })
        return user
    }

    async FindById(id) {
        return await Usermodel.findById(id)
    }
}

export default new AuthService;





