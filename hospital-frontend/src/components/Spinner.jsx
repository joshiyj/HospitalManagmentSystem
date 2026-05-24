export default function Spinner({ label = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 fade-in">
      <div className="spinner" />
      <p className="mt-4 text-sm text-[#9CA3AF] font-medium tracking-wide">{label}</p>
    </div>
  );
}
