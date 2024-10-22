import express from "express"
import userModel from "../models/userModel.js"
import { getUser, userLogin, userSignup } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/jwt.js"

const userRouter = express.Router()

//APIs
//demo
userRouter.get("/", (req, res) => res.send("User Router is Working"))

userRouter.get("/all", async (req, res) => { //verifying users collection
    let allUsers = await userModel.find()
    res.status(200).send(allUsers)
})

//user Registration(signup)
userRouter.post("/signup", userSignup)

//user Login
userRouter.post("/login", userLogin)

//get user(Auth Token)
userRouter.get("/auth", verifyToken, getUser)

export default userRouter