import { useEffect, useState } from "react";
import API from "../api/axios";
import Spinner from "../components/Spinner";

const TYPE_STYLE = {
  GENERAL:   { bg: "#F0FAF9", text: "#0D6E63", border: "#99E6DF" },
  PRIVATE:   { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  EMERGENCY: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
};

export default function Wards() {
  const [wards, setWards]   = useState([]);
  const [form, setForm]     = useState({ wardNo: "", wardType: "GENERAL" });
  const [msg, setMsg]       = useState({ text: "", ok: true });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const load = () => API.get("/wards").then((r) => setWards(r.data));
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  const notify = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: "" }), 3000); };

  const handleAdd = async () => {
    if (!form.wardNo) return;
    setActionLoading(true);
    try {
      await API.post("/wards", { wardNo: parseInt(form.wardNo), wardType: form.wardType });
      setForm({ wardNo: "", wardType: "GENERAL" });
      notify("Ward added successfully.");
      await load();
    } catch { 
      notify("Error adding ward.", false); 
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (no) => {
    setActionLoading(true);
    try {
      await API.delete(`/wards/${no}`);
      notify("Ward deleted.");
      await load();
    } catch {
      notify("Error deleting ward.", false);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Spinner label="Loading wards..." />;

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-[#111827] text-xl font-semibold">Wards</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">View and manage hospital wards</p>
      </div>

      <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 mb-4">
        <p className="text-[#111827] text-sm font-medium mb-4">Add Ward</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input type="number" placeholder="Ward No."
            value={form.wardNo}
            onChange={(e) => setForm({ ...form, wardNo: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] placeholder-[#C4C2BB] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition w-full sm:w-32"
          />
          <select value={form.wardType}
            onChange={(e) => setForm({ ...form, wardType: e.target.value })}
            className="border border-[#E8E6DF] bg-[#FAFAF7] text-[#111827] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D6E63] focus:ring-1 focus:ring-[#0D6E63]/20 transition w-full sm:w-48">
            <option>GENERAL</option>
            <option>PRIVATE</option>
            <option>EMERGENCY</option>
          </select>
          <button onClick={handleAdd}
            className="bg-[#0D6E63] hover:bg-[#0A5C53] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition w-full sm:w-auto">
            Add Ward
          </button>
        </div>
        {msg.text && (
          <p className={`text-xs mt-3 ${msg.ok ? "text-[#0D6E63]" : "text-red-500"}`}>{msg.text}</p>
        )}
      </div>

      <div className="bg-white border border-[#E8E6DF] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[#111827] text-sm font-medium">All Wards</p>
          <div className="flex gap-2">
            <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">
              {wards.filter(w => w.occupied).length} occupied
            </span>
            <span className="text-xs text-[#9CA3AF] bg-[#F4F3EE] px-2.5 py-1 rounded-full">
              {wards.filter(w => !w.occupied).length} free
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E8E6DF] bg-[#FAFAF7]">
                {["Ward No.", "Type", "Status", "Patient", "Doctor", "Action"].map((h, i) => (
                  <th key={h} className={`py-3 px-5 text-[#9CA3AF] text-xs font-medium uppercase tracking-wider ${i === 5 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wards.length === 0 && (
                <tr><td colSpan={6} className="text-center text-[#C4C2BB] py-12 text-sm">No wards found</td></tr>
              )}
              {wards.map((w, i) => {
                const s = TYPE_STYLE[w.wardType] ?? TYPE_STYLE.GENERAL;
                return (
                  <tr key={w.wardNo}
                    className={`border-b border-[#F4F3EE] hover:bg-[#FAFAF7] transition ${i === wards.length - 1 ? "border-0" : ""}`}>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-[#111827]">W{w.wardNo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full border"
                        style={{ background: s.bg, color: s.text, borderColor: s.border }}>
                        {w.wardType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${w.occupied ? "bg-[#EF4444]" : "bg-[#22C55E]"}`} />
                        <span className={`text-xs font-medium ${w.occupied ? "text-[#DC2626]" : "text-[#16A34A]"}`}>
                          {w.occupied ? "Occupied" : "Available"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#6B7280] text-sm">{w.patient?.patientName ?? "—"}</td>
                    <td className="px-5 py-3.5 text-[#6B7280] text-sm">{w.doctor?.doctorName ?? "—"}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => handleDelete(w.wardNo)}
                        className="text-xs text-[#DC2626] hover:text-white hover:bg-[#DC2626] border border-[#FCA5A5] hover:border-[#DC2626] px-3 py-1.5 rounded-lg transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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