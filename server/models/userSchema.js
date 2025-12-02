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
    bio: {
        type: String
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
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "jobs"
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


// /** 
// * Paste one or more documents here
// */
// {
//   "name": "Amey Anil Khondekar",
//   "email": {
//     "userEmail": "ameykhondekar01@gmail.com",
//     "verified": true,
//     "_id": {
//       "$oid": "69144467202cb2a8f0d1865b"
//     }
//   },
//   "password": "$2b$10$EHpVH5f57f7tmKjprRzR3eOr.a0pnJILCKuhXOTaDLAHvJ876FaH.",
//   "phone": "09766696550",
//   "address": {
//     "street": "sakkaradhara",
//     "city": "nagpur",
//     "state": "Maharashtra",
//     "country": "India",
//     "pincode": "440024",
//     "_id": {
//       "$oid": "69144467202cb2a8f0d1865c"
//     }
//   },
//   "dob": "2025-05-11",
//   "qualifications": "",
//   "documents": [
//     "1764144448318-ERP_Documentation.pdf",
//     "1764144472221-Pharma-billing-backend-and-frontend-blueprint.pdf",
//     "1764314391799-loan_amortization.pdf"
//   ],
//   "profile_picture": "1764314630441-352.jpg",
//   "appliedJobs": [
//     {
//       "_id": "692e775c488339627741c778"
//     }
//   ],
//   "timeStamp": {
//     "$date": "2025-11-12T08:25:11.266Z"
//   },
//   "__v": 0
// }