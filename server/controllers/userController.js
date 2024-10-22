import userModel from "../models/userModel.js"
import { comparePassword, createHashPassword } from "../utils/bcrypt.js"
import { createToken } from "../utils/jwt.js"

export const userSignup = async (req, res) => {
    try {
        let user = req.body
        let { firstName, email, password } = user
        if (firstName && email && password) {
            let hasedPassword = await createHashPassword(password)
            let userData = new userModel({ ...user, password: hasedPassword })
            let response = await userData.save()
            let token = createToken({ id: response._id })
            return res.status(201).send({ token })
        } else {
            return res.status(400).send({ error: "Provide all required fileds" })
        }
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", msg: error.message })
    }
}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await userModel.findOne({ email })
            if (user) {
                //compare password logic
                const isMatched = await comparePassword(password, user.password)
                if (isMatched) {
                    let token = createToken({ id: user._id })
                    return res.status(200).send({ message: "Login Successful", token })
                } else {
                    return res.status(400).send({ error: "Password Not Matched" })
                }
            } else {
                return res.status(400).send({ error: "User Not Registered" })
            }
        } else {
            return res.status(400).send({ error: "Provide all fields" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req
        const userData = await userModel.findById(id, { _id: 0, __v: 0, password: 0 })
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message })
    }
}