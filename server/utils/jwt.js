import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const secretKey = process.env.JWT_SECRET

export const createToken = (data) => {
    try {
        return jwt.sign(data, secretKey)
    } catch (error) {
        throw new Error("error in JWT conversion")
    }
}