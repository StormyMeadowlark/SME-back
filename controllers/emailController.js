import { sendEmailWithNodeMailer, sendEmailWithSendGrid } from "../utils/email.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import config from "../config.js";
import { generateApiKey } from "../utils/encryption.js";

export const sendQuoteEmail = async (req, res) => {
  const {
    firstName,
    lastName,
    VIN,
    make,
    model,
    year,
    licensePlate,
    message,
    email,
    phoneNumber
  } = req.body;
  const date = new Date();
  const readableDate = date.toLocaleString()

  // Create email body
  const subject = `Online Quote Request ${readableDate}-- ${VIN}`;
  const text = `First Name: ${firstName}\nLast Name: ${lastName}\nVIN: ${VIN}\nMake: ${make}\nModel: ${model}\nYear: ${year}\nLicense Plate: ${licensePlate}\nMessage: ${message}\nEmail: ${email}\nPhone Number: ${phoneNumber}`;
  const to = `${email}`

  try {
    // Check if the email is associated with a customer
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new customer account with default settings
      const defaultPassword = "Pa$$word1234";
      const hashedPassword = await bcrypt.hash(
        defaultPassword,
        config.saltRounds
      );

      user = new User({
        email,
        password: hashedPassword,
        role: "Customer",
        customerType: "Retail", // Default type
        apiKey: await generateApiKey(), // Generate API key
      });

      await user.save();
    }
    user.emails.push({ subject, text });
    await user.save();

    // Send email via Nodemailer
    await sendEmailWithNodeMailer(email, subject, text, to);

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Error sending quote request", error });
  }
};
