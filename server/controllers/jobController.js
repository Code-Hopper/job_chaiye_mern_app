import { companyModel } from "../models/companySchema.js";
import { jobModel } from "../models/jobSchema.js";
import { userModel } from "../models/userSchema.js";

// create a job
const createJob = async (req, res) => {
    try {

        let company = req.company

        if (!company) throw ("Invalid request. Please register/login first !")

        let { title, jobRequirements } = req.body

        if (!title || !jobRequirements) throw ("invalid or missing data to create job !");

        let { type, category, exprience, location, postDate, offeredSalary, description } = jobRequirements

        if (!type || !category || !exprience || !location || !postDate || !offeredSalary || !description) throw ("jobRequirements data is not valid !")

        let newJob = new jobModel({ title, jobCreatedBy: company._id, jobRequirements })

        let result = await newJob.save()

        // add job id to company data [createdJobs]
        console.log(result)

        let updateCompany = companyModel.findByIdAndUpdate(company._id, { $push: { "createdJobs": result.insertedId } })

        if (updateCompany.modifiedCount == 0) throw ("unable to store job in company data !")

        res.status(202).json({ message: "new job created successfully !" })

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "unable to add job !", err })
    }
}

// actions a job
const handleJobAction = async (req, res) => {
    try {

        let company = req.company

        if (!company) throw ("Invalid request. Please register/login first !")

        let { jobId } = req.params

        let { action } = req.params

        if (action == "delete") {
            let result = await jobModel.findByIdAndDelete(jobId)
            if (!result) throw ("unable to delete the job")
            // remove this job id from user data
            res.status(202).json({ message: "successfully delete the job !" })
        } else if (action == "close") {
            let result = await jobModel.findByIdAndUpdate(jobId, { $set: { "closed": true } })
            if (result.modifiedCount == 0) throw ("unable to close a job !")
            res.status(202).json({ message: "successfully closed the job !" })
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "unable to delete a job !", err })
    }
}

// handle job application
const handleJobApplication = async (req, res) => {
    try {

        let user = req.user

        if (!user) throw ("user not loged In !")

        let { jobId } = req.params

        if (!jobId) throw ("job id is invalid !")

        // search for job usign id get job details check if closed is true if it is then not to apply for the job

        let updateJob = await jobModel.findByIdAndUpdate(jobId, { $push: { "applications": user._id } })

        let updateUser = await userModel.findByIdAndUpdate(user._id, { $push: { "appliedJobs": jobId } })

        if (updateJob.modifiedCount == 0) throw ("unable to apply for a job !")

        if (updateUser.modifiedCount == 0) throw ("unable to apply for a job !")

        res.status(202).json({ message: "applied for job successfully !" })

    } catch (err) {
        console.log("unable to apply for a job :", err)
        res.status(400).json({ message: "unable to apply for this job !", err })
    }
}

// get job details(filters)
const getJobData = async (req, res) => {
    try {
        let jobData = await jobModel.find({})
        res.status(200).json({ message: "got job/s data !", jobData })
    } catch (err) {
        console.log("unable to get job data : ", err)
        res.status(500).json({ message: "unable to send jobs data at this moment !", err })
    }
}

export { createJob, handleJobAction, handleJobApplication, getJobData }