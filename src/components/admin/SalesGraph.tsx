import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SalesGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"WEEKLY" | "MONTHLY" | "YEARLY">(
    "MONTHLY"
  );

  // Sample data for each time period
  const weeklyData = [
    { name: "Week 1", value: 120 },
    { name: "Week 2", value: 230 },
    { name: "Week 3", value: 180 },
    { name: "Week 4", value: 310 },
  ];

  const monthlyData = [
    { name: "JUL", value: 150 },
    { name: "AUG", value: 280 },
    { name: "SEP", value: 190 },
    { name: "OCT", value: 320 },
    { name: "NOV", value: 250 },
    { name: "DEC", value: 380 },
  ];

  const yearlyData = [
    { name: "2020", value: 1200 },
    { name: "2021", value: 1800 },
    { name: "2022", value: 2100 },
    { name: "2023", value: 2900 },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "WEEKLY":
        return weeklyData;
      case "MONTHLY":
        return monthlyData;
      case "YEARLY":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <div className="flex items-center sm:flex-nowrap flex-wrap justify-between border-b border-[#232321]/20 pb-3 mb-9">
        <h2 className="text-lg font-semibold">Sale Graph</h2>
        <div className="flex space-x-4 sm:flex-nowrap flex-wrap">
          {(["WEEKLY", "MONTHLY", "YEARLY"] as const).map((tab) => (
            <button
              key={tab}
              className={`font-open-sans font-semibold text-sm px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-[#003F62] !text-white"
                  : "bg-transparent !text-[#232321] border border-[#232321]/20"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getActiveData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280" }}
              ticks={[0, 100, 200, 300, 400]}
              domain={[0, 400]}
            />
            <Line
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              type="monotone"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesGraph;
