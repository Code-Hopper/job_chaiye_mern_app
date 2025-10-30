import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { redisClient } from "../utils/redisClient.js"
import { userModel } from "../models/userSchema.js"

dotenv.config({ path: "./config.env" })

// to send a email we need a transporter 

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',   // Gmail SMTP
    port: 465,                // 465 for SSL, 587 for STARTTLS
    secure: true,             // true for 465, false for 587
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD,
    }
});

function genrateRandomNumber() {
    return Math.floor((Math.random() * 9000) + 1000).toString()
}

async function sendOTP(email) {
    try {

        let otp = genrateRandomNumber()

        let emailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "your otp to verify email address | valid for 5 mins !",
            text: `your otp is ${otp} !`,
        }

        await transporter.sendMail(emailOptions)

        redisClient.setEx(`email:${email}`, 300, otp)

        return { messag: "otp sent successfully !", status: true }

    } catch (err) {
        console.log("error sending otp : ", err)
        return { message: "unable to send otp !", status: false }
    }
}

let test = (req, res) => {
    res.status(200).json({ message: "welcome to user test route !" })
}

let handleUserRegister = async (req, res) => {
    try {
        let { name, phone, email, address, dob, qualifications, password } = req.body

        if (!name || !phone || !email || !address || !dob || !qualifications || !password) throw ("invalid/missing data !")

        // check if user exits
        let checkIfUserExits = await userModel.findOne({ $or: [{ "email.userEmail": email }, { "phone": phone }] })

        // if found then error
        if (checkIfUserExits) throw ("uanble to register user please change email/phone and try again !")

        let emailObejct = {
            userEmail: email, verified: false
        }

        // to send otp
        let result = await sendOTP(email)

        if (!result.status) throw (`unable to send otp at ${email} | ${result.message}`)

        // create user object
        let newUser = new userModel({ name, phone, email: emailObejct, address, dob, qualifications, password })

        await newUser.save();

        res.status(202).json({ message: `user registered successfully please verify the email using otp that is sent on email ${email}` })

    } catch (err) {
        console.log("error while registering user : ", err)
        res.status(400).json({ message: "unable to register user !", err })
    }
}

const handleOTPVerification = async (req, res) => {
    try {

        let { email, userOtp } = req.body;

        // check if email exits
        let emailExits = await userModel.findOne({ "email.userEmail": email })

        if (!emailExits) throw (`email ${email} is not registred !`)

        let storedOtp = await redisClient.get(`email:${email}`)

        if (!storedOtp) throw ("otp is expried/not found !")

        if (storedOtp != userOtp) throw ("invalid otp !")

        console.log('otp matched successfully !')

        // change verification status to true
        let updateUserObject = await userModel.updateOne({ "email.userEmail": email }, { $set: { "email.verified": true } })

        console.log(updateUserObject)

        // remove the temp otp
        redisClient.del(`email:${email}`)

        res.status(202).json({ message: "otp verified successfully please head to login !" })

    } catch (err) {
        console.log("error while verifying the otp : ", err)
        res.status(500).json({ message: "failed to verify user otp please try again later !", err })
    }
}

export { test, handleUserRegister, handleOTPVerification }