const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function emailSendHandler(to, subject, html, text) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER, // sender address
            to: to, // list of recipients
            subject: subject, // subject line
            text: text, // plain text body
            html: html, // HTML body
        });

         return info;
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports ={emailSendHandler}