import { otpModel } from "../models/otpModel.js"
import userModel from "../models/userModel.js"
import { generateOTP } from "../utils/otp.js"

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const response = await userModel.findOne({ email })
        if (response) {
            const otp = generateOTP()
            const isUser = await otpModel.findOne({ email })
            if (isUser) {
                await otpModel.updateOne({ email }, { $set: { otp } })
            } else {
                let otpData = new otpModel({ email, otp })
                await otpData.save()
            }
            res.status(200).send({ message: "OTP generated" })
        } else {
            return res.status(400).send({ error: "User is not registered" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal server error", msg: error.message })
    }
}