const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: 2525,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD_EMAIL
        }
      });
      const mailOptions = {
        from : "PixelPlay <resetPassword@PixelPlay.com",
        to: options.email,
        subject : options.subject,
        text : options.message
      };
      await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;