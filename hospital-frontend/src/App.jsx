import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard  from "./pages/Dashboard";
import Patients   from "./pages/Patients";
import Doctors    from "./pages/Doctors";
import Wards      from "./pages/Wards";
import Admissions from "./pages/Admissions";

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#F4F3EE]">
      <Sidebar />
      <main className="flex-1 ml-60 p-8 max-w-6xl">
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