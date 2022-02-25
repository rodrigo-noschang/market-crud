import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b89a5cdb686c79",
      pass: "2ac698394afa43"
    }
});