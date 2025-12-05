import { useState } from "react";
import { useCompany } from "../../../context/companyContext";

const CompanyLoginRegister = () => {
  const { companyLogin } = useCompany();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    await companyLogin(form);
  };

  return (
    <div className="p-10 shadow w-96 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Company Login</h2>

      <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        className="bg-primary text-white p-2 w-full"
        onClick={submit}
      >
        Login
      </button>
    </div>
  );
};

export default CompanyLoginRegister;