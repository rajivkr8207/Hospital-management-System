import {
  sendResetPasswordEmail,
  verifyEmailsendemail,
  tesingsendemail
} from "../service/email.service.js";

const mailHandlers = {

  welcomeMail: async ({ email, name }) => {
    return tesingsendemail(email, name);
  },

  forgotPasswordMail: async ({ email, name, hashtoken }) => {
    return sendResetPasswordEmail(email, name, hashtoken);
  },

  verifyMail: async ({ email, name, hashtoken }) => {
    return verifyEmailsendemail(email, name, hashtoken);
  }

};

export default mailHandlers;