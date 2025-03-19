import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailTranspoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass:process.env.EMAIL_PASSWORD
    }
});

export default emailTranspoter;
