import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { redisClient } from "../utils/redisClient.js"
import { userModel } from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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


async function sendOTPForPasswordReset(email) {
    try {

        let otp = genrateRandomNumber()

        let emailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: "Password Reset Request !",
            text: `your otp is ${otp} valid for 5 mins please use this otp to reset your password !`,
        }

        await transporter.sendMail(emailOptions)

        redisClient.setEx(`emailPasswordReset:${email}`, 300, otp)

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


const handleUserLogin = async (req, res) => {
    try {

        let { email, password } = req.body

        let userExists = await userModel.findOne({ "email.userEmail": email })

        if (!userExists) throw ("unable to find the email please register the user first !")

        if (!userExists.email.verified) {

            // to send otp
            let result = await sendOTP(email)

            if (!result.status) throw (`unable to send otp at ${email} | ${result.message}`)

            // redirect user to email verification route

            throw (`user email is not verfied we have sent an otp at ${email} !`)
        }

        // compare password

        let result = await bcrypt.compare(password, userExists.password)

        if (!result) throw ("invalid email/password !")

        // create jwt and send to user 

        let token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "24hr" })

        res.status(202).json({ message: `welcome user ${userExists.name} ! login was successfull.`, token })

    } catch (err) {
        console.log("error while login : ", err)
        res.status(400).json({ message: "unable to login", err })
    }
}

const handleResetPasswordRequest = async (req, res) => {
    try {

        let { email } = req.body;

        if (!email) throw ("invalid/incomplete data !")

        let userExists = await userModel.findOne({ "email.userEmail": email })

        if (!userExists) throw ("invalid email address/Please register first !")

        let result = await sendOTPForPasswordReset(email)

        if (!result.status) throw (`unable to send otp at ${email} | ${result.message}`)

        res.status(201).json({ messag: `an otp sent to your email ${email} | valid for 5 mins to reset your password !` })

    } catch (err) {
        console.log("password reset request failed !", err)
        res.status(400).json({ messag: "password reset request failed !", err })
    }
}


const handleOTPForPasswordReset = async (req, res) => {
    try {

        let { email, userOtp, newPassword } = req.body;

        // check if email exits
        let emailExits = await userModel.findOne({ "email.userEmail": email })

        if (!emailExits) throw (`email ${email} is not registred !`)

        let storedOtp = await redisClient.get(`emailPasswordReset:${email}`)

        if (!storedOtp) throw ("otp is expried/not found !")

        if (storedOtp != userOtp) throw ("invalid otp !")

        console.log('otp matched successfully for password reset !')

        // encrypt

        let hash = await bcrypt.hash(newPassword, 10)

        // change verification status to true
        let updateUserObject = await userModel.updateOne({ "email.userEmail": email }, { $set: { "password": hash } })

        console.log(updateUserObject)

        // remove the temp otp
        redisClient.del(`emailPasswordReset:${email}`)

        res.status(202).json({ message: "otp verified successfully and password has been changed please head to login !" })

    } catch (err) {
        console.log("error while verifying the otp : ", err)
        res.status(500).json({ message: "failed to verify user otp please try again later !", err })
    }
}

const handleUserFileUpload = async (req, res) => {
    try {
        if (!req.file) throw new Error("Failed to upload a file!");

        const fileName = req.file.filename;
        const fileType = req.params.file_type; // 'resume' or 'profile_pictures'

        // Determine which field to update
        let updateField = {};

        if (fileType === "resume") {
            updateField = { $push: { documents: fileName } };
        } else if (fileType === "profile_picture") {
            updateField = { $set: { profile_picture: fileName } };
        } else {
            throw new Error("Invalid file type. Only 'resume' or 'profile_pictures' allowed.");
        }

        // Update the user document
        const result = await userModel.updateOne(
            { "email.userEmail": req.user.email.userEmail },
            updateField
        );

        if (result.modifiedCount === 0) {
            throw new Error("User not found or file not saved.");
        }

        const uploadDest = `uploads/${fileType}/${fileName}`;

        res.status(202).json({
            message: `${fileType === "resume" ? "Resume" : "Profile picture"} uploaded successfully!`,
            fileName,
            uploadDest,
        });

    } catch (err) {
        console.error("Error in handleUserFileUpload:", err);
        res.status(500).json({
            message: "Failed to upload the file.",
            error: err.message || err,
        });
    }
};

export { test, handleUserRegister, handleOTPVerification, handleUserLogin, handleResetPasswordRequest, handleOTPForPasswordReset, handleUserFileUpload }