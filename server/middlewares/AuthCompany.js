import jwt from "jsonwebtoken";
import { companyModel } from "../models/companySchema.js";

export const AuthCompany = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await companyModel.findById(decoded.id).select("-password");
    if (!company) return res.status(401).json({ message: "Unauthorized company" });

    req.company = company;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};