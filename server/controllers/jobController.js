import { jobModel } from "../models/jobSchema.js";
import { companyModel } from "../models/companySchema.js";

/* ---------------- CREATE JOB (COMPANY) ---------------- */
export const createJob = async (req, res) => {
  try {
    const job = await jobModel.create({
      ...req.body,
      jobCreatedBy: req.company._id,
    });

    await companyModel.findByIdAndUpdate(req.company._id, {
      $push: { createdJobs: job._id },
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- GET ALL JOBS (PUBLIC) ---------------- */
export const fetchAllJobs = async (req, res) => {
  const jobs = await jobModel
    .find({ closed: false })
    .populate("jobCreatedBy", "companyDetails.name companyLogo");

  res.json(jobs);
};

/* ---------------- GET COMPANY JOBS ---------------- */
export const fetchCompanyJobs = async (req, res) => {
  const jobs = await jobModel.find({
    jobCreatedBy: req.company._id,
  });

  res.json(jobs);
};

/* ---------------- APPLY JOB (USER) ---------------- */
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await jobModel.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.closed)
      return res.status(400).json({ message: "Job is closed" });

    if (job.maxApplications > 0 && job.applications.length >= job.maxApplications)
      return res.status(400).json({ message: "Applications limit reached" });

    if (job.applications.includes(req.user._id))
      return res.status(400).json({ message: "Already applied" });

    job.applications.push(req.user._id);
    await job.save();

    res.json({ message: "Job applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- CLOSE JOB (COMPANY) ---------------- */
export const closeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await jobModel.findOne({
      _id: jobId,
      jobCreatedBy: req.company._id,
    });

    if (!job) return res.status(404).json({ message: "Unauthorized action" });

    job.closed = true;
    await job.save();

    res.json({ message: "Job closed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- GET APPLIED USERS (COMPANY) ---------------- */
export const fetchAppliedUsers = async (req, res) => {
  const job = await jobModel
    .findById(req.params.jobId)
    .populate("applications", "name email phone document");

  res.json(job.applications);
};