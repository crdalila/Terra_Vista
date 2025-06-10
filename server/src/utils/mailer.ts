
import { Request, Response } from 'express'
import { createTransport } from 'nodemailer';

interface mailInterface {
  email: string,
  subject: string,
  text: string
}

function CommentText(userName: string, text: string) {
  return `<p>Hello ${userName}, <br>
  A comment has been added to a task : <br>
  "${text}" <br>
  Thank you, <br>
  Terra Vista.</p>`
}
//For status change
function StatusText(userName: string, text: string) {
  return `<p>Hello ${userName}, <br>
  A comment has been added to a task : <br>
  "${text}" <br>
  Thank you, <br>
  Terra Vista.</p>`
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

function sendMail(email: string, subject: string, text: string) {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
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