import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()
const secretKey = process.env.JWT_SECRET

export const verifyToken = async (req, res, next) => {
    try {
        let authToken = req.headers.authorization.split(" ")[1]
        if (authToken) {
            try {
                const { id } = jwt.verify(authToken, secretKey)
                req.id = id
                next()
            } catch (error) {
                return res.status(400).send({ error: "Token verification failed" })
            }
        } else {
            return res.status(400).send({ error: "Authorization Token Is Required" })
        }
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error", msg: error.message })
    }
}