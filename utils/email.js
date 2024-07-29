import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import config from "../config.js";
import emailRouter from "../routes/emailRoutes.js";
import { sendQuoteEmail } from "../controllers/emailController.js";

sgMail.setApiKey(config.sendGridApiKey);

const sendEmailWithSendGrid = async (to, subject, text) => {
  const msg = {
    to,
    from: config.shopEmail,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully with SendGrid");
  } catch (error) {
    console.error("Error sending email with SendGrid:", error);
  }
};

const sendEmailWithNodeMailer = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net", 
    port: 465,
    auth: {
      user: "apikey",
      pass: config.sendGridApiKey,
    },
  });

  const mailOptions = {
    from: config.userEmail,
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

export { sendEmailWithSendGrid, sendEmailWithNodeMailer };
