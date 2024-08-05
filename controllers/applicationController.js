// controllers/jobApplicationController.js
import Application from "../models/Application.js";
import nodemailer from "nodemailer";
import { SENDGRID_CAREER_KEY, EMAIL_ADVISOR } from "../config.js";

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
      jobHistory
    });

    await newApplication.save();

    // Send confirmation email to the applicant
    await transporter.sendMail({
      from: "marketing@hemautomotive.com",
      to: email,
      subject: "Job Application Received",
      text: `Hey ${name},\n\n Thanks for tossing your wrench into the HEM Automotive toolbox! We're excited to see if you're the perfect fit to keep our engines purring. We'll dive under the hood of your application & get back to you faster than a mechanic finding that "mystery noise."\n\nHEM Automotive Hiring Team`,
    });

    // Send notification email to the admin
    await transporter.sendMail({
      from: "marketing@hemautomotive.com",
      to: EMAIL_ADVISOR,
      subject: `Job Application from ${name}`,
      text: `A new job application has been received from ${name}. \n \n Experience: ${experience} \n\n Skills: ${skills} \n\n Education: ${education} \n\n Job History: ${jobHistory} \n\n Expected Pay: ${expectedPay} \n\n Phone Number: ${phone} \n\n Email: ${email} \n\n`,
    });

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};
