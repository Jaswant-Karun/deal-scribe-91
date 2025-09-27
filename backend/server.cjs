const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Demo summaries for multiple brands & models
const fallbackSummaries = {
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

// 📌 API route for summary
app.post("/api/summary", (req, res) => {
  const { brand, model } = req.body;

  console.log(`📥 Request for brand: ${brand}, model: ${model}`);

  const points =
    (fallbackSummaries[brand] && fallbackSummaries[brand][model]) || [
      "Margin: 5% (baseline)",
      "SLA = 24h",
      "License expires in 180 days",
    ];

  res.json({ brand, model, points });
});

// 📌 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
