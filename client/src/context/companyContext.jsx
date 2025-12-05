import { createContext, useContext, useState } from "react";
import * as companyAPI from "../api/companyAPI";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);

  const companyLogin = async (payload) => {
    const res = await companyAPI.companyLogin(payload);
    localStorage.setItem("companyToken", res.data.token);
    setCompany(res.data.company);
  };

  const fetchCompanyProfile = async () => {
    const token = localStorage.getItem("companyToken");
    if (!token) return;

    const res = await companyAPI.fetchCompanyProfile(token);
    setCompany(res.data);
  };

  const logoutCompany = () => {
    localStorage.removeItem("companyToken");
    setCompany(null);
  };

  return (
    <CompanyContext.Provider
      value={{ company, companyLogin, fetchCompanyProfile, logoutCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);