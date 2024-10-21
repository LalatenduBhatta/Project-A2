import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, minLength: 3 },
    lastName: { type: String, trim: true },
    dob: { type: String },
    gender: { type: String, enum: ["male", "female", "others"] },
    mobile: { type: String, minLength: 10 },
    email: { type: String, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true, unique: true },
    password: { type: String, required: true },
    orders: { type: [{}] },
    cartItems: { type: [{}] },
    savedAddress: { type: [{}] },
    savedPayments: { type: [{}] }
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema)

export default userModel