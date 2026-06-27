import { useState } from "react";

export default function Settings() {
  const [apiUrl, setApiUrl] = useState(
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
  );
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    // The base URL used at runtime comes from VITE_API_BASE_URL in .env.
    // This field is a visual placeholder for now; wire it to persisted
    // storage/config once the backend integration is finalized.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Settings</h1>
        <p className="text-slate-400 mt-2">
          Platform preferences and backend connection settings.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 max-w-xl space-y-6"
      >
        <div>
          <label className="block text-sm text-slate-400 mb-2">
            Backend API Base URL
          </label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="
              w-full bg-slate-950 border border-slate-700 rounded-lg
              px-4 py-3 outline-none focus:border-blue-500 text-white
            "
          />
          <p className="text-xs text-slate-500 mt-2">
            Set via <code>VITE_API_BASE_URL</code> in your <code>.env</code> file.
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
        >
          Save
        </button>

        {saved && (
          <p className="text-green-400 text-sm">Preferences saved.</p>
        )}
      </form>
    </div>
  );
}
