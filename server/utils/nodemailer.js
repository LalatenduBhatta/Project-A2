import nodemailer from "nodemailer"
import { config } from "dotenv";
// config()
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.EMAIL_PASS
    }
})

export const sendOtpMail = async (to, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADD,
            to,
            sub: "OTP FROM THE MERN PROJECT",
            text: `Hey, the otp of MERN Project is ${otp} will expire in 5min.
            Don't share your otp with unknown resources`
        }
        await transport.sendMail(mailOptions)
    } catch (error) {
        return new Error("Error while sending Mail")
    }
}