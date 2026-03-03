import MailTranspoter from '../config/mail.js'

export const sendDoctorInviteEmail = async ({
  email,
  registerLink,
  hospitalName = "Your Hospital Name"
}) => {
  try {
    const mailOptions = {
      from: `"${hospitalName}" <${process.env.MAIL_EMAIL}>`,
      to: email,
      subject: "Doctor Registration Invitation",
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f4f6f9; padding:30px;">
          <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
            
            <h2 style="color:#2c3e50;">Doctor Registration Invitation</h2>
            
            <p>Dear Doctor,</p>
            
            <p>
              You have been invited to join <strong>${hospitalName}</strong> 
              as a registered medical professional.
            </p>

            <p>
              To complete your registration, please click the button below:
            </p>

            <div style="text-align:center; margin:30px 0;">
              <a href="${registerLink}" 
                 style="background-color:#2c3e50; 
                        color:white; 
                        padding:12px 25px; 
                        text-decoration:none; 
                        border-radius:5px;
                        font-weight:bold;">
                Complete Registration
              </a>
            </div>

            <p>
              This link will expire in <strong>24 hours</strong>. 
              If you did not expect this invitation, please ignore this email.
            </p>

            <hr style="margin:30px 0;" />

            <p style="font-size:12px; color:#7f8c8d;">
              For security reasons, do not share this link with anyone.
              <br/>
              © ${new Date().getFullYear()} ${hospitalName}. All rights reserved.
            </p>

          </div>
        </div>
      `
    };

    await MailTranspoter.sendMail(mailOptions);

    return true;

  } catch (error) {
    console.error("Doctor Invite Email Error:", error);
    return false;
  }
};