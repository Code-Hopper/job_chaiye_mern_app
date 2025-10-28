import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({ path: "./config.env" })

async function conn() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log("connection with database was succesfull !")
    } catch (err) {
        console.log("unable to connect with database : ", err)
    }
}

conn()