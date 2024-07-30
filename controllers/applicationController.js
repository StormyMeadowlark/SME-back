// controllers/jobApplicationController.js
import Application from "../models/Application.js";
import nodemailer from "nodemailer";
import { SENDGRID_CAREER_KEY } from "../config.js";

// Configure SendGrid with NodeMailer
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey", // this is the SendGrid username
    pass: SENDGRID_CAREER_KEY, // this is the SendGrid API key
  },
});

// Handle form submission
export const createApplication = async (req, res) => {
  const {
    name,
    email,
    phone,
    experience,
    skills,
    expectedPay,
    education,
    jobHistory,
    labels,
  } = req.body;

  try {
    // Store the application in the database
    const newApplication = new Application({
      name,
      email,
      phone,
      experience,
      skills,
      expectedPay,
      education,
      jobHistory,
      labels,
    });

    await newApplication.save();

    // Send confirmation email to the applicant
    await transporter.sendMail({
      from: "marketing@hemautomotive.com",
      to: email,
      subject: "Job Application Received",
      text: `Dear ${name},\n\nThank you for applying for a position at our company. We will review your application and contact you soon.\n\nBest regards,\nCompany Name`,
    });

    // Send notification email to the admin
    await transporter.sendMail({
      from: "marketing@hemautomotive.com",
      to: "admin@example.com",
      subject: "New Job Application",
      text: `A new job application has been received from ${name}. Please review the application in the admin panel.`,
    });

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};
