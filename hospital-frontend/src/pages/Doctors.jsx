import { useEffect, useState } from "react";
import API from "../api/axios";
import Spinner from "../components/Spinner";

const SPEC_COLORS = {
  default: { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" }
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm]       = useState({ doctorName: "", specialization: "" });
  const [msg, setMsg]         = useState({ text: "", ok: true });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => API.get("/doctors").then((r) => setDoctors(r.data));
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  const notify = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: "" }), 3000); };

  const handleAdd = async () => {
    if (!form.doctorName || !form.specialization) return;
    setActionLoading(true);
    try {
      await API.post("/doctors", form);
      setForm({ doctorName: "", specialization: "" });
      notify("Doctor added successfully.");
      await load();
    } catch { 
      notify("Error adding doctor.", false); 
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (name) => {
    setActionLoading(true);
    try {
      await API.delete(`/doctors/${name}`);
      notify("Doctor removed.");
      await load();
    } catch {
      notify("Error removing doctor.", false);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner label="Loading doctors..." />;

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-[#111827] text-xl font-semibold">Doctors</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Manage doctor records and specializations</p>
      </div>

      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 mb-4">
        <p className="text-[#111827] text-sm font-medium mb-4">Add Doctor</p>
        <div className="flex gap-2 flex-wrap items-center">
          <input type="text" placeholder="Doctor Name"
            value={form.doctorName}
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] placeholder-[#C4C2BB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition flex-1 min-w-40"
          />
          <input type="text" placeholder="Specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] placeholder-[#C4C2BB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition flex-1 min-w-40"
          />
          <button onClick={handleAdd}
            className="bg-[#0D6E63] hover:bg-[#0A5C53] text-white text-sm font-medium px-5 py-2 rounded-lg transition">
            Add Doctor
          </button>
        </div>
        {msg.text && (
          <p className={`text-xs mt-3 ${msg.ok ? "text-[#0D6E63]" : "text-red-500"}`}>{msg.text}</p>
        )}
      </div>

      <div className="bg-white border border-[#E8E6DF] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E6DF] flex items-center justify-between">
          <p className="text-[#111827] text-sm font-medium">All Doctors</p>
          <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">{doctors.length} records</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8E6DF] bg-[#FAFAF7]">
              <th className="text-left px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="text-left px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">Specialization</th>
              <th className="text-right px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 && (
              <tr><td colSpan={3} className="text-center text-[#C4C2BB] py-12 text-sm">No doctors found</td></tr>
            )}
            {doctors.map((d, i) => (
              <tr key={d.doctorName}
                className={`border-b border-[#F4F3EE] hover:bg-[#FAFAF7] transition ${i === doctors.length - 1 ? "border-0" : ""}`}>
                <td className="px-5 py-3.5 text-[#111827] font-medium">{d.doctorName}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-medium bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] px-2.5 py-1 rounded-full">
                    {d.specialization}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => handleDelete(d.doctorName)}
                    className="text-xs text-[#DC2626] hover:text-white hover:bg-[#DC2626] border border-[#FCA5A5] hover:border-[#DC2626] px-3 py-1.5 rounded-lg transition">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Premium Overlay Loader for Actions */}
      {actionLoading && (
        <div className="fixed inset-0 bg-[#F4F3EE]/40 backdrop-blur-[1px] flex items-center justify-center z-50">
          <div className="bg-white border border-[#E8E6DF] rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3 max-w-xs">
            <div className="spinner"></div>
            <p className="text-sm font-medium text-[#111827]">Updating database...</p>
          </div>
        </div>
      )}
    </div>
  );
}