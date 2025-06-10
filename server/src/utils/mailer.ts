
import { Request, Response } from 'express'
import { Resend } from 'resend';

const resend = new Resend('re_CuzVyDwr_5DVNoQJMHqt875XppsKrhsVd');

interface mailInterface {
  email: string,
  subject: string,
  text: string
}

async function sendMail(email: string, subject: string, text: string) {
  const { data, error } = await resend.emails.send({
    from: 'Terra Vista <terravista@resend.dev>',
    to: [email],
    subject: subject,
    html: "<p>" + text + "</p>",
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};

async function sendMailController(req: Request, res: Response) {
  const mailData: mailInterface = req.body;
  res.json(await sendMail(mailData.email, mailData.subject, mailData.text));
}

export { sendMailController };