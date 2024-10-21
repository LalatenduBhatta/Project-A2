import userModel from "../models/userModel.js"
import { createHashPassword } from "../utils/bcrypt.js"
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


