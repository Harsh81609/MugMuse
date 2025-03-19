import dotenv from "dotenv";

// Utils
import emailTranspoter from "./nodemailer.js";
import {
  accountCreationEmail,
  confirmationOfResetPassword,
  passwordResetEmail,
} from "./emailTemplate.js";

dotenv.config();

export const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: `${process.env.EMAIL_ID}`,
    to: email,
    subject: "Welcome To Foodflick",
    html: accountCreationEmail.replace("{name}", username),
    category: "Welcome Email",
  };
  await emailTranspoter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error in sendWelcomeEmail Utils: ", error);
      throw error;
    }
  });
};

export const resetPasswordEmail = async (email, name, resetLink) => {
  const emailContent = passwordResetEmail
    .replace(/{name}/g, name)
    .replace(/{reset-link}/g, resetLink);

  const mailOptions = {
    from: `${process.env.EMAIL_ID}`,
    to: email,
    subject: "Reset Password",
    html: emailContent,
    category: "Reset Password",
  };
  await emailTranspoter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error in resetPasswordEmail Utils: ", error);
      throw error;
    }
  });
};

export const confirmationResetPassword = async (email, username) => {
  const mailOptions = {
    from: `${process.env.EMAIL_ID}`,
    to: email,
    subject: "Reset Password Successfully",
    html: confirmationOfResetPassword.replace("{name}", username),
    category: "Reset Password Confirmation",
  };
  await emailTranspoter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error in resetPasswordEmail Utils: ", error);
      throw error;
    }
  });
};