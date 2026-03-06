import {
  sendResetPasswordEmail,
  verifyEmailsendemail,
  tesingsendemail
} from "../service/email.service.js";
import { sendDoctorInviteEmail } from "../utils/sendDoctorInviteEmail.js";

const mailHandlers = {

  welcomeMail: async ({ email, name }) => {
    return tesingsendemail(email, name);
  },

  forgotPasswordMail: async ({ email, name, hashtoken }) => {
    return sendResetPasswordEmail(email, name, hashtoken);
  },

  verifyMail: async ({ email, name, hashtoken }) => {
    return verifyEmailsendemail(email, name, hashtoken);
  },

  sendDoctorInvite: async ({email, registerLink})=>{
    return sendDoctorInviteEmail({email, registerLink})
  }
};

export default mailHandlers;