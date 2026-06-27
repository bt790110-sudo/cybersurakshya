export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <input
      type="text"
      placeholder="Search IP, Country or Reason..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="
        w-full
        xl:w-96
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        px-4
        py-3
        outline-none
        focus:border-blue-500
        text-white
      "
    />
  );
}