import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    MONGODB: process.env.MONGODB,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_EMAIL: process.env.MAIL_EMAIL,
    IMAGE_KIT: process.env.IMAGE_KIT,


};

export default config;