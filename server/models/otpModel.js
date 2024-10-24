import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: Number, required: true },
}, { timestamps: true })

export const otpModel = mongoose.model("otp", otpSchema)