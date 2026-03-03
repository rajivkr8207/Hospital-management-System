import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
const UserScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "full name is required"]
    },
    email: {
        type: String,
        unique: [true, "email is required"],
        required: [true, "email is required"]
    },
    username: {
        type: String,
        unique: [true, "username is required"],
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'DOCTOR', 'PATIENT'],
        default: 'PATIENT',
        
    },
    dob: {
        type: Date
    },

    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"]
    },

    photo: {
        type: String,
        
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpire: {
        type: Date
    },
    ForgetPasswordToken: {
        type: String
    },
    ForgetPasswordTokenExpire: {
        type: Date
    }
})



UserScheme.pre('save', async function (next) {
    const token = await bcrypt.hash(this.email.toString(), 10)

    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    this.verificationToken = token;
    this.verificationTokenExpire = Date.now() + 3600000;
})

UserScheme.methods.ComparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserScheme.methods.GenrateToken = async function () {
    return await jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '15d' })
}


const Usermodel = mongoose.model('User', UserScheme)

export default Usermodel;




