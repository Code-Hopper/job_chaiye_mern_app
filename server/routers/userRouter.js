import express from "express"
import { test, handleUserRegister, handleOTPVerification } from "../controllers/userController.js"

let userRouter = express.Router()

userRouter.get("/test", test)

userRouter.post("/register", handleUserRegister)

userRouter.post("/verify-otp", handleOTPVerification)

export { userRouter }