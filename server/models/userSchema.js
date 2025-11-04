import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Sub-documents
const addressSchema = {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    pincode: { type: String, default: "" },
};

const emailSchema = {
    userEmail: { type: String, required: true },
    verified: { type: Boolean, default: false },
};

// Main schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: emailSchema,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: addressSchema,
        default: {},
    },
    dob: {
        type: String,
        required: true,
    },
    qualifications: {
        type: String,
        default: "",
    },
    documents: {
        type: [String],
        default: [],
    },
    profile_picture: {
        type: String,
        default: "",
    },
    appliedJobs: {
        type: [String],
        default: [],
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

export const userModel = mongoose.model("users", userSchema);