"use server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

function encoder(email) {
  const payload = {
    email,
    timestamp: Date.now(), // Adding a timestamp to make it more unique
  };
  const secret = process.env.EMAIL_ENCRYPT;
  return jwt.sign(payload, secret, { expiresIn: "5m" });
}

export default async function verificationEmail(email) {
  try {
    const transpoter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSCODE,
      },
    });

    const mailOptions = {
      from: {
        name: "Complete-next-oAuth",
        address: process.env.EMAIL,
      },
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the following link: 
             https://multi-step-from-snowy.vercel.app/login/api/auth/emailverification?token=${encoder(
               email
             )}`,
    };

    await transpoter.sendMail(mailOptions, function (error) {
      if (error) {
        //console.log("Error in sending email", error);
        throw new Error("Error in sending email", error);
      }
    });
  } catch (error) {
    //console.log("Error in sending email", error);
    throw new Error("Error in sending email", error);
  }
}
