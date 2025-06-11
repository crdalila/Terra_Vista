
import { Request, Response } from 'express'
import { createTransport } from 'nodemailer';

enum mailType {
  comment = "comment",
  status = "status"
}

interface mailInterface {
  name: string,
  email: string,
  subject: string,
  text: string
  type: mailType
}

function CommentText(userName: string, text: string) {
  return `Hello ${userName}, 
  A comment has been added to a task : 
  "${text}" 
  Thank you, 
  Terra Vista.`
}
//For status change
function StatusText(userName: string, text: string) {
  return `Hello ${userName}, 
  A comment has been added to a task : 
  "${text}" 
  Thank you, 
  Terra Vista.`
}

const transporter = createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  },
});

function sendMail(name: string, email: string, subject: string, text: string, type: mailType) {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: subject,
    text: type == mailType.comment ? CommentText(name, text) : StatusText(name, text)
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
  res.json(sendMail(mailData.name, 
    mailData.email, mailData.subject, 
    mailData.text, mailData.type));
}

export { mailType, mailInterface, sendMail,sendMailController };