import { useEffect } from "react";
import { useCompany } from "../../../context/companyContext";
import CompanyJobsGrid from "./CompanyJobsGrid";
import CreateJob from "./CreateJob";

const CompanyDashboard = () => {
  const { fetchCompanyProfile } = useCompany();

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  return (
    <div className="p-10 grid grid-cols-2 gap-10">
      <CreateJob />
      <CompanyJobsGrid />
    </div>
  );
};

export default CompanyDashboard;