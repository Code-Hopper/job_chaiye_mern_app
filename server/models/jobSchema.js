import mongoose, { mongo } from "mongoose";
const jobRequirementsObject = {
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    exprience: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    offeredSalary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    jobCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "companies",
        required: true
    },
    jobRequirements: {
        type: Object,
        default: jobRequirementsObject
    },
    applications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        required: false
    },
    closed: {
        type: Boolean,
        default: false
    },
    maxApplications: {
        type: Number,
        default: 0
    },
    timeStamp: {
        type: Date,
        default: Date.now()
    }
})

let jobModel = new mongoose.model("jobs", jobSchema)

export { jobModel }



// {
//   "title": "Full Stack MERN Developer",
//   "jobCreatedBy": "692e76358c8b01ed527b27b7",
//   "jobRequirements": {
//     "type": "Full-Time",
//     "category": "Software Development",
//     "exprience": "2-4 years",
//     "location": "Pune, Maharashtra",
//     "offeredSalary": 45000,
//     "description": "We are looking for a MERN Stack Developer with strong frontend + backend expertise."
//   },
//   "applications": [
//     {
//       "_id": "69144467202cb2a8f0d1865a"
//     }
//   ],
//   "closed": false,
//   "maxApplications": 50
// }