import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import Spinner from "../components/Spinner";

const ICONS = {
  patients:   "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  doctors:    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  wards:      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  admissions: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
};

export default function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, wards: 0, admissions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/patients"),
      API.get("/doctors"),
      API.get("/wards"),
      API.get("/admissions"),
    ]).then(([p, d, w, a]) =>
      setStats({ patients: p.data.length, doctors: d.data.length,
                 wards: w.data.length, admissions: a.data.length })
    ).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading dashboard..." />;

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-[#111827] text-xl font-semibold">Dashboard</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Hospital overview at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Patients"   value={stats.patients}   icon={ICONS.patients}   accent="#0D6E63" />
        <StatCard label="Doctors"    value={stats.doctors}    icon={ICONS.doctors}    accent="#7C3AED" />
        <StatCard label="Wards"      value={stats.wards}      icon={ICONS.wards}      accent="#D97706" />
        <StatCard label="Admissions" value={stats.admissions} icon={ICONS.admissions} accent="#0369A1" />
      </div>

      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5">
        <p className="text-[#111827] text-sm font-medium mb-2">How to use</p>
        <p className="text-[#6B7280] text-sm leading-relaxed">
          Use the sidebar to manage Patients, Doctors, Wards, and Admissions.
          To admit a patient — navigate to Admissions, select an available ward,
          choose a patient and doctor, then click Admit.
          Discharging a patient auto-calculates hours stayed and generates the total bill.
        </p>
      </div>
    </div>
  );
}