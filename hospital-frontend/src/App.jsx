import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard  from "./pages/Dashboard";
import Patients   from "./pages/Patients";
import Doctors    from "./pages/Doctors";
import Wards      from "./pages/Wards";
import Admissions from "./pages/Admissions";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F3EE]">
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E8E6DF] flex items-center justify-between px-4 z-40">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 rounded-lg hover:bg-[#F4F3EE] text-[#6B7280]"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#0D6E63] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] tracking-wide">M</span>
          </div>
          <span className="text-[#111827] font-semibold text-sm">MediCore</span>
        </div>
        <div className="w-8"></div> {/* Spacer for symmetry */}
      </header>

      {/* Responsive Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-60 p-4 md:p-8 pt-20 md:pt-8 max-w-6xl w-full">
        <Routes>
          <Route path="/"           element={<Dashboard />}  />
          <Route path="/patients"   element={<Patients />}   />
          <Route path="/doctors"    element={<Doctors />}    />
          <Route path="/wards"      element={<Wards />}      />
          <Route path="/admissions" element={<Admissions />} />
        </Routes>
      </main>
    </div>
  );
}