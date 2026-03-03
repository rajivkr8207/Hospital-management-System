import express from 'express'
import IdentifyUser from '../middleware/auth.middleware.js'
import { changeUserPassword, ForgetPassword, LoginUser, ProfileUser, RegisterUser, ReSendVerifyEmail, updateProfilePhoto, VerifyAccount } from "../controllers/auth.controller.js"
import multer from 'multer'
const AuthRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage() })


AuthRouter.post('/register', upload.single('imageurl'), RegisterUser)

AuthRouter.post('/login', LoginUser)


AuthRouter.get('/verify/token', VerifyAccount)

AuthRouter.patch('/send/verify/mail', ReSendVerifyEmail)


AuthRouter.patch('/forget/password', ForgetPassword)

AuthRouter.patch('/forget/password/verify', ForgetPassword)

// AuthRouter.patch('/reverify', Authcontroller.ReSendVerifyEmail)

AuthRouter.get('/profile', IdentifyUser, ProfileUser)
AuthRouter.patch('/update/avatar/:id', IdentifyUser, updateProfilePhoto)

AuthRouter.patch(
    "/me/change-password",
    IdentifyUser,
    changeUserPassword
);

export default AuthRouter;



