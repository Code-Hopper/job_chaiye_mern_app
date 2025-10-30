import mongoose from "mongoose";
import bcrypt from "bcrypt"

let addressObject = {
    street: "", city: "", state: "", country: "", pincode: ""
}

let emailObject = {
    userEmail: "", verified: false
}

let userShcema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: Object,
        require: true,
        default: emailObject
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: Object,
        require: true,
        default: addressObject
    },
    dob: {
        type: String,
        require: true
    },
    qualifications: {
        type: String,
        default: ""
    },
    documents: {
        type: Array,
        default: []
    },
    appliedJobs: {
        type: Array,
        default: []
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
})

userShcema.pre("save", async function () {
    try {
        console.log("user password is :", this.password)
        this.password = await bcrypt.hash(this.password, 10)
        console.log("password hased and saved !")
    } catch (err) {
        console.log("error in pre method : ", err)
        throw err
    }
})

let userModel = new mongoose.model("users", userShcema)

export { userModel }