import { useEffect, useState } from "react";
import API from "../api/axios";
import Spinner from "../components/Spinner";

export default function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [wards, setWards] = useState([]);
  const [form, setForm] = useState({ wardNo: "", patientId: "", doctorName: "" });
  const [msg, setMsg] = useState({ text: "", ok: true });
  const [loading, setLoading] = useState(true);

  const loadAdmissions = () => API.get("/admissions").then((r) => setAdmissions(r.data));
  const loadFreeWards = () => API.get("/wards").then((r) => setWards(r.data.filter((w) => !w.occupied)));

  const notify = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: "" }), 3500); };

  useEffect(() => {
    Promise.all([
      loadAdmissions(),
      loadFreeWards(),
      API.get("/patients").then((r) => setPatients(r.data)),
      API.get("/doctors").then((r) => setDoctors(r.data)),
    ]).finally(() => setLoading(false));
  }, []);

  const handleAdmit = async () => {
    if (!form.wardNo || !form.patientId || !form.doctorName) return;
    try {
      const res = await API.post(
        `/admissions/admit?wardNo=${form.wardNo}&patientId=${form.patientId}&doctorName=${encodeURIComponent(form.doctorName)}`
      );
      notify(res.data);
      setForm({ wardNo: "", patientId: "", doctorName: "" });
      loadAdmissions();
      loadFreeWards();
    } catch { notify("Error admitting patient.", false); }
  };

  const handleDischarge = async (id) => {
    const res = await API.put(`/admissions/discharge/${id}`);
    notify(res.data);
    loadAdmissions();
    loadFreeWards();
  };

  const selectClass = "border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition";

  if (loading) return <Spinner label="Loading admissions..." />;

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-[#111827] text-xl font-semibold">Admissions</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Admit patients and manage discharges</p>
      </div>
      {/* Admit Form */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 mb-4">
        <p className="text-[#111827] text-sm font-medium mb-4">Admit Patient</p>
        <div className="flex gap-2 flex-wrap items-center">
          <select value={form.wardNo} onChange={(e) => setForm({ ...form, wardNo: e.target.value })} className={selectClass}>
            <option value="">Select Ward</option>
            {wards.map((w) => <option key={w.wardNo} value={w.wardNo}>Ward {w.wardNo} — {w.wardType}</option>)}
          </select>
          <select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className={selectClass}>
            <option value="">Select Patient</option>
            {patients.map((p) => <option key={p.patientId} value={p.patientId}>#{p.patientId} — {p.patientName}</option>)}
          </select>
          <select value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} className={selectClass}>
            <option value="">Select Doctor</option>
            {doctors.map((d) => <option key={d.doctorName} value={d.doctorName}>{d.doctorName} — {d.specialization}</option>)}
          </select>
          <button onClick={handleAdmit} className="bg-[#0D6E63] hover:bg-[#0A5C53] text-white text-sm font-medium px-5 py-2 rounded-lg transition">Admit</button>
        </div>
        {msg.text && <p className={`text-xs mt-3 ${msg.ok ? "text-[#0D6E63]" : "text-red-500"}`}>{msg.text}</p>}
      </div>
      {/* Table */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E6DF] flex items-center justify-between">
          <p className="text-[#111827] text-sm font-medium">Admission Records</p>
          <div className="flex gap-2">
            <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">{admissions.filter(a => !a.dischargedAt).length} active</span>
            <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">{admissions.filter(a => a.dischargedAt).length} discharged</span>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8E6DF] bg-[#FAFAF7]">
              {["ID","Patient","Doctor","Ward","Admitted","Hours","Bill","Action"].map((h, i) => (
                <th key={h} className={`py-3 px-4 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider ${i === 7 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admissions.length === 0 && <tr><td colSpan={8} className="text-center text-[#C4C2BB] py-12 text-sm">No admissions found</td></tr>}
            {admissions.map((a, i) => (
              <tr key={a.admissionId} className={`border-b border-[#F4F3EE] hover:bg-[#FAFAF7] transition ${i === admissions.length - 1 ? "border-0" : ""}`}>
                <td className="px-4 py-3.5"><span className="text-xs font-semibold text-[#0D6E63] bg-[#F0FAF9] border border-[#0D6E63]/15 px-2 py-0.5 rounded-md">#{a.admissionId}</span></td>
                <td className="px-4 py-3.5 text-[#111827] font-medium">{a.patient?.patientName ?? "—"}</td>
                <td className="px-4 py-3.5 text-[#6B7280]">{a.doctor?.doctorName ?? "—"}</td>
                <td className="px-4 py-3.5 text-[#6B7280]">W{a.ward?.wardNo ?? "—"}</td>
                <td className="px-4 py-3.5 text-[#9CA3AF] text-xs">{a.admittedAt ? new Date(a.admittedAt).toLocaleString() : "—"}</td>
                <td className="px-4 py-3.5 text-[#6B7280]">{a.hoursStayed || "—"}</td>
                <td className="px-4 py-3.5">
                  {a.totalBill
                    ? <span className="text-sm font-semibold text-[#D97706]">₹{a.totalBill}</span>
                    : <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2 py-0.5 rounded-md">Pending</span>
                  }
                </td>
                <td className="px-4 py-3.5 text-right">
                  {!a.dischargedAt
                    ? <button onClick={() => handleDischarge(a.admissionId)} className="text-xs text-[#0D6E63] hover:text-white hover:bg-[#0D6E63] border border-[#0D6E63]/30 hover:border-[#0D6E63] px-3 py-1.5 rounded-lg transition font-medium">Discharge</button>
                    : <span className="text-xs text-[#C4C2BB] bg-[#F4F3EE] px-2.5 py-1 rounded-full">Discharged</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}