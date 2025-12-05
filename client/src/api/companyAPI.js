import axios from "axios";

const BASE = import.meta.env.VITE_BASE_API_URL;

export const companyRegister = (data) =>
  axios.post(`${BASE}/company/register`, data);

export const companyLogin = (data) =>
  axios.post(`${BASE}/company/login`, data);

export const fetchCompanyProfile = (token) =>
  axios.get(`${BASE}/company/profile`, {
    headers: { Authorization: token },
  });

export const createJob = (token, data) =>
  axios.post(`${BASE}/jobs/create`, data, {
    headers: { Authorization: token },
  });

export const fetchCompanyJobs = (token) =>
  axios.get(`${BASE}/jobs/company`, {
    headers: { Authorization: token },
  });

export const closeJob = (token, jobId) =>
  axios.put(`${BASE}/jobs/close/${jobId}`, {}, {
    headers: { Authorization: token },
  });
