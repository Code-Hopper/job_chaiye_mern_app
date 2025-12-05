import express from "express";
import {
  createJob,
  fetchAllJobs,
  fetchCompanyJobs,
  applyJob,
  closeJob,
  fetchAppliedUsers,
} from "../controllers/jobController.js";

import { AuthCompany } from "../middlewares/AuthCompany.js";
import { AuthUser } from "../middlewares/AuthUser.js";

const jobRouter = express.Router();

/* -------- PUBLIC -------- */
jobRouter.get("/all", fetchAllJobs);

/* -------- COMPANY -------- */
jobRouter.post("/create", AuthCompany, createJob);
jobRouter.get("/company", AuthCompany, fetchCompanyJobs);
jobRouter.put("/close/:jobId", AuthCompany, closeJob);
jobRouter.get("/applications/:jobId", AuthCompany, fetchAppliedUsers);

/* -------- USER -------- */
jobRouter.post("/apply/:jobId", AuthUser, applyJob);

export { jobRouter };