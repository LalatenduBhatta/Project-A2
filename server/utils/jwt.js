import jwt from "jsonwebtoken"

const secretKey = "ABCD"

export const createToken = (data) => {
    try {
        return jwt.sign(data, secretKey)
    } catch (error) {
        throw new Error("error in JWT conversion")
    }
}