import express from "express";
import {
  registerCompany,
  loginCompany,
  fetchCompanyProfile,
  uploadCompanyFile,
  deleteCompanyDocument,
} from "../controllers/companyController.js";

import { AuthCompany } from "../middlewares/AuthCompany.js";
import { upload } from "../config/multerConfig.js";

const companyRouter = express.Router();

companyRouter.post("/register", registerCompany);
companyRouter.post("/login", loginCompany);

companyRouter.get("/profile", AuthCompany, fetchCompanyProfile);

companyRouter.post(
  "/upload-file/:file_type",
  AuthCompany,
  upload.single("file"),
  uploadCompanyFile
);

companyRouter.delete("/delete-document", AuthCompany, deleteCompanyDocument);

export { companyRouter };