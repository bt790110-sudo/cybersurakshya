import { Bell, Search, UserCircle, Menu } from "lucide-react";

export default function Navbar({ onMenuClick = () => {} }) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 sm:px-8 gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-300 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold truncate">
          Security Operations Center
        </h2>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 shrink-0">
        <div className="hidden md:flex items-center bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5">
          <Search size={16} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-40"
          />
        </div>

        <Search className="md:hidden cursor-pointer" size={20} />
        <Bell className="cursor-pointer" size={20} />
        <UserCircle size={32} />
      </div>
    </header>
  );
}
