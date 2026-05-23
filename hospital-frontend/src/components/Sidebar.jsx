import { NavLink } from "react-router-dom";

const links = [
  { to: "/",           icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard"  },
  { to: "/patients",   icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",                                                                                label: "Patients"   },
  { to: "/doctors",    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",                           label: "Doctors"    },
  { to: "/wards",      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",  label: "Wards"      },
  { to: "/admissions", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",              label: "Admissions" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-[#E8E6DF] flex flex-col z-50">

      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#E8E6DF]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0D6E63] flex items-center justify-center">
            <span className="text-white font-bold text-xs tracking-wide">M</span>
          </div>
          <div>
            <p className="text-[#111827] font-semibold text-sm">MediCore</p>
            <p className="text-[#9CA3AF] text-[11px]">Hospital Management</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#F0FAF9] text-[#0D6E63]"
                  : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F4F3EE]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <svg
                  className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#0D6E63]" : "text-[#9CA3AF]"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#E8E6DF]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F4F3EE] border border-[#E8E6DF] flex items-center justify-center">
            <span className="text-[9px] text-[#9CA3AF] font-medium">v1</span>
          </div>
          <p className="text-[#9CA3AF] text-[11px]">Training Project · 2026</p>
        </div>
      </div>
    </aside>
  );
}