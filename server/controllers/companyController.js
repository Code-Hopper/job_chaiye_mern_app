import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { companyModel } from "../models/companySchema.js";

/* ---------------- REGISTER ---------------- */
export const registerCompany = async (req, res) => {
  try {
    const company = await companyModel.create(req.body);
    res.status(201).json({ message: "Company registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ---------------- LOGIN ---------------- */
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await companyModel.findOne({
      "email.userEmail": email,
    });

    if (!company) return res.status(404).json({ message: "Company not found" });

    const match = await bcrypt.compare(password, company.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- FETCH PROFILE ---------------- */
export const fetchCompanyProfile = async (req, res) => {
  res.json(req.company);
};

/* ---------------- UPLOAD LOGO / DOCUMENT ---------------- */
export const uploadCompanyFile = async (req, res) => {
  try {
    const { file_type } = req.params;

    if (file_type === "logo") req.company.companyLogo = req.file.filename;
    if (file_type === "document") req.company.document = req.file.filename;

    await req.company.save();

    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- DELETE DOCUMENT ---------------- */
export const deleteCompanyDocument = async (req, res) => {
  try {
    req.company.document = "";
    await req.company.save();
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};