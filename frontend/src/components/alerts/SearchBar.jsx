import { Search } from "lucide-react";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="relative w-full md:w-96">

      <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search alerts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          pl-10
          pr-4
          py-2
          outline-none
          focus:border-blue-500
          text-white
        "
      />

    </div>
  );
}