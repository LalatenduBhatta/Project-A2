import express from "express"
import userModel from "../models/userModel.js"
import { userSignup } from "../controllers/userController.js"

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


export default userRouter