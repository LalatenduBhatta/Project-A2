import { otpModel } from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { createToken } from "../utils/jwt.js"
import { sendOtpMail } from "../utils/nodemailer.js"
import { generateOTP } from "../utils/otp.js"

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const response = await userModel.findOne({ email })
        if (response) {
            const otp = generateOTP()
            const isUser = await otpModel.findOne({ email })
            if (isUser) {
                let lastUpdated = isUser.updatedAt.getTime() //this convert the time to millisecond value
                let currentTime = new Date().getTime()
                if (currentTime - lastUpdated > 30000) {
                    await otpModel.updateOne({ email }, { $set: { otp } })
                    await sendOtpMail(email, otp)
                } else {
                    return res.status(400).send({ error: "Wait for 30sec before generating another OTP" })
                }
            } else {
                let otpData = new otpModel({ email, otp })
                await otpData.save()
                await sendOtpMail(email, otp)
            }
            return res.status(200).send({ message: "OTP generated" })
        } else {
            return res.status(400).send({ error: "User is not registered" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal server error", msg: error.message })
    }
}


export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body
        let otpData = await otpModel.aggregate([{ $match: { email } }, {
            $lookup: {
                from: "users",
                localField: "email",
                foreignField: "email",
                as: "userDetails"
            }
        }])
        otpData = otpData[0]
        if (otpData) {
            let lastUpdated = otpData.updatedAt.getTime()
            let currentTime = new Date().getTime()
            let fiveMin = 1000 * 60 * 5
            if (currentTime - lastUpdated <= fiveMin) {
                if (otpData.otp === otp) {
                    let userID = otpData.userDetails[0]._id.toString()
                    let token = createToken({ id: userID })
                    return res.status(200).send({ message: "OTP is Matched", token })
                } else {
                    return res.status(400).send({ error: "OTP is not matched....Try Again" })
                }
            } else {
                return res.status(400).send({ error: "OTP is expired generate again" })
            }
        } else {
            return res.status(400).send({ error: "OTP is not generated for the email address" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal server error", msg: error.message })
    }
}