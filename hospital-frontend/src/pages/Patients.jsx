import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm]         = useState({ patientId: "", patientName: "" });
  const [msg, setMsg]           = useState({ text: "", ok: true });

  const load = () => API.get("/patients").then((r) => setPatients(r.data));
  useEffect(() => { load(); }, []);

  const notify = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: "" }), 3000); };

  const handleAdd = async () => {
    if (!form.patientId || !form.patientName) return;
    try {
      await API.post("/patients", { patientId: parseInt(form.patientId), patientName: form.patientName });
      setForm({ patientId: "", patientName: "" });
      notify("Patient added successfully.");
      load();
    } catch { notify("Error adding patient.", false); }
  };

  const handleDelete = async (id) => {
    await API.delete(`/patients/${id}`);
    notify("Patient removed.");
    load();
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-[#111827] text-xl font-semibold">Patients</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Add and manage patient records</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 mb-4">
        <p className="text-[#111827] text-sm font-medium mb-4">Add Patient</p>
        <div className="flex gap-2 flex-wrap items-center">
          <input type="number" placeholder="Patient ID"
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] placeholder-[#C4C2BB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition w-32"
          />
          <input type="text" placeholder="Full Name"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] placeholder-[#C4C2BB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition flex-1 min-w-48"
          />
          <button onClick={handleAdd}
            className="bg-[#0D6E63] hover:bg-[#0A5C53] text-white text-sm font-medium px-5 py-2 rounded-lg transition">
            Add Patient
          </button>
        </div>
        {msg.text && (
          <p className={`text-xs mt-3 ${msg.ok ? "text-[#0D6E63]" : "text-red-500"}`}>{msg.text}</p>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E6DF] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E6DF] flex items-center justify-between">
          <p className="text-[#111827] text-sm font-medium">All Patients</p>
          <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">{patients.length} records</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E8E6DF] bg-[#FAFAF7]">
              <th className="text-left px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="text-left px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="text-right px-5 py-3 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && (
              <tr><td colSpan={3} className="text-center text-[#C4C2BB] py-12 text-sm">No patients found</td></tr>
            )}
            {patients.map((p, i) => (
              <tr key={p.patientId}
                className={`border-b border-[#F4F3EE] hover:bg-[#FAFAF7] transition ${i === patients.length - 1 ? "border-0" : ""}`}>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-semibold text-[#0D6E63] bg-[#F0FAF9] border border-[#0D6E63]/15 px-2 py-0.5 rounded-md">
                    #{p.patientId}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[#111827] font-medium">{p.patientName}</td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => handleDelete(p.patientId)}
                    className="text-xs text-[#DC2626] hover:text-white hover:bg-[#DC2626] border border-[#FCA5A5] hover:border-[#DC2626] px-3 py-1.5 rounded-lg transition">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}