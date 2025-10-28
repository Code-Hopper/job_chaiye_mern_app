import express from "express"
import { test,handleUserRegister } from "../controllers/userController.js"

let userRouter = express.Router()

userRouter.get("/test", test)

userRouter.post("/register", handleUserRegister)

export { userRouter }