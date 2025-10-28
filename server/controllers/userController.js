import nodemailer from "nodemailer"
import dotenv from "dotenv"

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

let test = (req, res) => {
    res.status(200).json({ message: "welcome to user test route !" })
}

let handleUserRegister = (req, res) => {
    try {
        let { name, phone, email, address, dob, qualifications } = req.body

        if (!name || !phone || !email || !address || !dob || !qualifications) throw ("invalid/missing data !")

        // check if user exits
            // if found then error

        // create user object

        // encrypt password

        // save user object

        // exit

    } catch (err) {
        console.log("error while registering user : ", err)
        res.status(400).json({ message: "unable to register user !", err })
    }
}

export { test, handleUserRegister }