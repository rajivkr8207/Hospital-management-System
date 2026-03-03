import MailTranspoter from '../config/mail.js'

export const verifyEmailsendemail = async ({ email,name, hashtoken }) => {
     const url = `${process.env.FRONTEND_URL}/verify-email?token=${hashtoken}`;
    try {
        const mailoptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "verify your email",
            html: `
     <h2>Hello ${name},</h2>
    <p>Your account has been created successfully.</p>
    <p>Please click below to verify your email:</p>
    <a href="${url}" 
       style="background:#007bff; padding:10px 20px; color:white; text-decoration:none;">
       Verify Email
    </a>
    <p>This link expires in 15 minutes.</p>
    `,

        }
        const mailresponse = await MailTranspoter.sendMail(mailoptions)
        return mailresponse
    } catch (error) {
        console.error(error);
    }
}


export const sendResetPasswordEmail = async ({ email, name, hashtoken }) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${hashtoken}`;

  try {
    const mailoptions = {
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Hello ${name},</h2>
        <p>We received a request to reset your password.</p>
        <p>Please click the button below to set a new password:</p>
        
        <a href="${url}" 
           style="background:#dc3545; padding:10px 20px; color:white; text-decoration:none; border-radius:5px;">
           Reset Password
        </a>
        
        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    const mailresponse = await MailTranspoter.sendMail(mailoptions);
    return mailresponse;

  } catch (error) {
    console.error("Reset Password Email Error:", error);
    throw error; // important for controller handling
  }
};