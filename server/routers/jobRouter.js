import express from "express"

import { createJob, getJobData, handleJobAction, handleJobApplication } from "../controllers/jobController.js"
import { AuthUser } from "../middlewares/AuthUser.js"

const jobRouter = express.Router()

// jobRouter.post("/add-job", authCompany, createJob)

// jobRouter.post("/job-action/:action/:jobId", authCompany, handleJobAction)

jobRouter.post("/apply-for-job/:jobId", AuthUser, handleJobApplication)

jobRouter.get("/get-jobs", getJobData)

export { jobRouter }