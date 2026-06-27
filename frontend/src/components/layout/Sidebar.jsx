import {
  LayoutDashboard,
  ShieldAlert,
  Users,
  Ban,
  PlayCircle,
  Settings,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Alerts", icon: ShieldAlert, path: "/alerts" },
  { name: "Agents", icon: Users, path: "/agents" },
  { name: "Blocked IPs", icon: Ban, path: "/blocked" },
  { name: "Simulation", icon: PlayCircle, path: "/simulation" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-40
          w-64 bg-slate-900 border-r border-slate-700 min-h-screen
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <span className="text-2xl font-bold">🛡 Cyber Surakshya</span>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mt-4">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-4 transition ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
