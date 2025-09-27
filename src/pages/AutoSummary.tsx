import { useState } from "react";

const AutoSummary = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [summary, setSummary] = useState<{
    brand: string;
    model: string;
    points: string[];
  } | null>(null);

  const [loading, setLoading] = useState(false);

  // Available models by brand
  const modelsByBrand: Record<string, string[]> = {
    Apple: ["iPhone 15", "iPhone 16", "iPhone 17"],
    Samsung: ["Galaxy S23", "Galaxy S24", "Galaxy Z Flip 5"],
    Oppo: ["Reno 10", "Find X6", "A98"],
    Vivo: ["X100", "V29", "Y78"],
    Xiaomi: ["Mi 13", "Redmi Note 13", "Poco F5"],
  };

  // Fallback summaries for demo use
  const fallbackSummaries: Record<string, Record<string, string[]>> = {
    Apple: {
      "iPhone 15": ["Margin: 11%", "SLA = 12h", "License expires in 100 days"],
      "iPhone 16": ["Margin: 12%", "SLA = 12h", "License expires in 90 days"],
      "iPhone 17": ["Margin: 13%", "SLA = 10h", "License expires in 80 days"],
    },
    Samsung: {
      "Galaxy S23": ["Margin: 9%", "SLA = 18h", "License expires in 120 days"],
      "Galaxy S24": ["Margin: 10%", "SLA = 16h", "License expires in 110 days"],
      "Galaxy Z Flip 5": [
        "Margin: 12%",
        "SLA = 20h",
        "License expires in 95 days",
      ],
    },
    Oppo: {
      "Reno 10": ["Margin: 8%", "SLA = 22h", "License expires in 130 days"],
      "Find X6": ["Margin: 9%", "SLA = 20h", "License expires in 125 days"],
      "A98": ["Margin: 7%", "SLA = 24h", "License expires in 140 days"],
    },
    Vivo: {
      X100: ["Margin: 9%", "SLA = 22h", "License expires in 115 days"],
      V29: ["Margin: 10%", "SLA = 20h", "License expires in 110 days"],
      Y78: ["Margin: 8%", "SLA = 24h", "License expires in 130 days"],
    },
    Xiaomi: {
      "Mi 13": ["Margin: 8%", "SLA = 24h", "License expires in 150 days"],
      "Redmi Note 13": [
        "Margin: 7%",
        "SLA = 26h",
        "License expires in 160 days",
      ],
      "Poco F5": ["Margin: 9%", "SLA = 22h", "License expires in 140 days"],
    },
  };

  const handleGenerateSummary = async () => {
    if (!model) {
      alert("Please select a phone model!");
      return;
    }

    setLoading(true);
    setSummary(null);

    try {
      const res = await fetch("http://localhost:5000/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("⚠️ Backend not running, using fallback demo data");
      setSummary({
        brand,
        model,
        points:
          fallbackSummaries[brand]?.[model] || [
            "Margin: 5%",
            "SLA = 24h",
            "License expires in 180 days",
          ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          📞 Auto-Summary (AI)
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Generate a quick, AI-powered 3-point summary for contracts.
        </p>

        {/* Brand Selector */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 mb-1">
            Select Brand:
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel(""); // reset model when brand changes
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            {Object.keys(modelsByBrand).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Model Selector */}
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 mb-1">
            Select Model:
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Choose a model --</option>
            {modelsByBrand[brand]?.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateSummary}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Generate Auto-Summary"}
        </button>

        {/* Show Summary */}
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
};

export default AutoSummary;
