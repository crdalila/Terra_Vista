
import { Request, Response } from 'express'
import nodeMailer from "nodemailer";


const transporter = nodeMailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false,
});

interface mailInterface {
  email: string,
  subject: string,
  text: string
}

function sendMail(email: string, subject: string, text: string) {
  const mailOptions = {
    from: 'terravistacomments@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Error:`, error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendMailController(req: Request, res: Response) {
  const mailData: mailInterface = req.body;
  res.json(sendMail(mailData.email, mailData.subject, mailData.text));
}

export { sendMailController };