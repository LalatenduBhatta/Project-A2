
import bcrypt from "bcrypt"

const saltRound = 10

export const createHashPassword = async (password) => {
    try {
        return bcrypt.hashSync(password, saltRound)
    } catch (error) {
        throw new Error("Error while hashing password")
    }
}