import mongoose from "mongoose";

/* ---------------- JOB REQUIREMENTS SUB SCHEMA ---------------- */

const jobRequirementsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  exprience: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  offeredSalary: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  postDate: {
    type: Date,
    default: Date.now,
  },
});

/* ---------------- MAIN JOB SCHEMA ---------------- */

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    jobCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },

    jobRequirements: {
      type: jobRequirementsSchema,
      required: true,
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    closed: {
      type: Boolean,
      default: false,
    },

    maxApplications: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // ✅ auto createdAt & updatedAt
);

const jobModel = mongoose.model("jobs", jobSchema);
export { jobModel };
