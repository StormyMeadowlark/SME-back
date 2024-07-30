import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import config from "../config.js";
import emailRouter from "../routes/emailRoutes.js";
import { sendQuoteEmail } from "../controllers/emailController.js";



const sendEmailWithNodeMailerCustomer = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    auth: {
      user: "apikey",
      pass: config.SENDGRID_CONTACT_KEY,
    },
  });

  const mailOptions = {
    from: config.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully with NodeMailer");
    console.log(mailOptions);
  } catch (error) {
    console.error("Error sending email with NodeMailer:", error);
  }
};



const sendEmailWithNodeMailerAdmin = async ( subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    auth: {
      user: "apikey",
      pass: config.SENDGRID_CONTACT_KEY,
    },
  });

  const mailOptions = {
    from: config.EMAIL_USER,
    to: config.EMAIL_ADVISOR,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully with NodeMailer");
    console.log(mailOptions);
  } catch (error) {
    console.error("Error sending email with NodeMailer:", error);
  }
};
export { sendEmailWithNodeMailerAdmin, sendEmailWithNodeMailerCustomer };
