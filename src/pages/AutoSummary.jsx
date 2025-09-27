import React, { useState } from "react";

function AutoSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    setSummary(null);

    try {
      const res = await fetch("http://localhost:5000/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: "Apple",
          model: "iPhone 17",
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
      // fallback demo summary if backend not running
      setSummary({
        brand: "Apple",
        model: "iPhone 17",
        points: [
          "Margin: 12% (+2% vs iPhone 16)",
          "SLA = 12h",
          "License expires in 90 days",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          📞 Auto-Summary (AI)
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Generate a quick, AI-powered 3-point summary for contracts.
        </p>

        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Generate Auto-Summary"}
        </button>

        {summary && (
          <div className="mt-6 bg-gray-100 rounded-xl p-4">
            <h2 className="text-xl font-semibold mb-2">
              {summary.brand} {summary.model}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {summary.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoSummary;
