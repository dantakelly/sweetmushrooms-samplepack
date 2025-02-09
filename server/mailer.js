import nodemailer from "nodemailer";
import 'dotenv/config';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function SendMailToUser(email) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sweetmushroomssamplepack@gmail.com',
                pass: process.env.EMAIL_GENERATED_PASSWORD,
            },
        });

        const htmlFilePath = path.join(__dirname, 'emailTemplate.html');
        const emailTemplateContent = fs.readFileSync(htmlFilePath, 'utf-8');

        await transporter.sendMail({
            from: '"Cultertraz" <sweetmushroomssamplepack@gmail.com>',
            to: email,
            subject: "Sweet Mushrooms Sample Pack - Demo",
            html: emailTemplateContent
        });

        console.log("Email sent successfully to", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}