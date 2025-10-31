import express from "express"
import { test, handleUserRegister, handleOTPVerification, handleUserLogin, handleResetPasswordRequest, handleOTPForPasswordReset } from "../controllers/userController.js"

let userRouter = express.Router()

userRouter.get("/test", test)

userRouter.post("/register", handleUserRegister)

userRouter.post("/verify-otp", handleOTPVerification)

userRouter.post("/user-login", handleUserLogin)

userRouter.post("/password-reset-request", handleResetPasswordRequest)

userRouter.post("/verify-reset-password-request", handleOTPForPasswordReset)

export { userRouter }