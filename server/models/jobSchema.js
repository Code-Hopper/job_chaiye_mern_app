import mongoose from "mongoose";
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
        type: String,
        required: true
    },
    jobRequirements: {
        type: Object,
        default: jobRequirementsObject
    },
    applications: {
        type: Array,
        default: [],
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