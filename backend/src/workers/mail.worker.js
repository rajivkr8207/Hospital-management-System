import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import { sendResetPasswordEmail, verifyEmailsendemail } from "../service/email.service.js";
import redis from "../config/redis.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});

const mailWorker = new Worker(
    "mailQueue",
    async (job) => {

        const { email, name, hashtoken } = job.data;

        switch (job.name) {

            case "welcomeMail":
                await transporter.sendMail({
                    from: process.env.MAIL_EMAIL,
                    to: email,
                    subject: "Welcome to Our Hospital System",
                    html: `<h3>Welcome ${name || ""} to our platform</h3>`
                });
                break;

            case "forgotPasswordMail":
                await sendResetPasswordEmail(email, name, hashtoken);
                break;

            case "verifyMail":
                await verifyEmailsendemail(email, name, hashtoken);
                break;

            default:
                console.log("Unknown mail job:", job.name);
        }

    },
    { connection: redis }
);

mailWorker.on("completed", (job) => {
    console.log(`Mail job ${job.name} completed`);
});

mailWorker.on("failed", (job, err) => {
    console.error(`Mail job ${job?.name} failed: ${err.message}`);
});