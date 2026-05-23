export default function StatCard({ label, value, icon, accent }) {
  return (
    <div className="bg-white border border-[#E8E6DF] rounded-2xl p-5 flex items-center gap-4 fade-in">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: accent + "15" }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
          stroke={accent} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-[#9CA3AF] text-[11px] font-medium uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="text-[#111827] text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}