const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});
async function sendMail(to, subject, html){
  const info = await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
  return info;
}
module.exports = { sendMail };
