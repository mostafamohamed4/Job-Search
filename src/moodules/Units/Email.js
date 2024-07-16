import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { TemplateEmail } from './templateEmail.js';

export const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mustafa.mohamed4040@gmail.com",
            pass: "jtyszhxmfnpzyayg",
        },
    });
    jwt.sign({ email }, "checkEmail", async (error, token) => {
        const info = await transporter.sendMail({
            from: '"Job-Search👻" <mustafa.mohamed4040@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Confirm Email ✔", // Subject line
            html: TemplateEmail(otp),// html body
        });
        console.log("Message sent: %s", info.messageId);
    })
}


