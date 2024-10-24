import express from "express"
import { deleteUser, getUser, updateUser, userLogin, userSignup } from "../controllers/userController.js"
import { verifyToken } from "../middlewares/jwt.js"
import { forgetPassword } from "../controllers/otpController.js"

const userRouter = express.Router()

//demo
userRouter.get("/", (req, res) => res.send("User Router is Working"))

//user Registration(signup)
userRouter.post("/signup", userSignup)

//user Login
userRouter.post("/login", userLogin)

//get user(Auth Token)
userRouter.get("/auth", verifyToken, getUser)

//update user(Auth Token)
userRouter.put("/update", verifyToken, updateUser)

//delete user(Auth Token)
userRouter.delete("/delete", verifyToken, deleteUser)

//forget Password
userRouter.post("/password", forgetPassword)

export default userRouter