import express from "express"
import { test, handleUserRegister, handleOTPVerification, handleUserLogin, handleResetPasswordRequest, handleOTPForPasswordReset, handleUserFileUplaod } from "../controllers/userController.js"
import { AuthUser } from "../middlewares/AuthUser.js"
import { upload } from "../config/multerConfig.js"

let userRouter = express.Router()

userRouter.get("/test", test)

userRouter.post("/register", handleUserRegister)

userRouter.post("/verify-otp", handleOTPVerification)

userRouter.post("/user-login", handleUserLogin)

userRouter.post("/password-reset-request", handleResetPasswordRequest)

userRouter.post("/verify-reset-password-request", handleOTPForPasswordReset)

// to upload resume/profie/docs we need to verfiy the user

userRouter.post("/upload-file/:file_type", AuthUser, upload.single("file"), handleUserFileUplaod)

export { userRouter }