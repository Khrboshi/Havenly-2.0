// components/MoodChart.jsx
"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function MoodChart({ moods }) {
  if (!moods || moods.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No mood history yet. Log your mood to see trends.
      </p>
    );
  }

  const labels = moods.map((m) =>
    new Date(m.created_at).toLocaleDateString()
  );

  // Prefer `score`, fallback to `mood_value`
  const values = moods.map((m) => {
    if (typeof m.score === "number") return m.score;
    if (typeof m.mood_value === "number") return m.mood_value;
    return 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: values,
        borderColor: "#0D7A7E",
        backgroundColor: "rgba(13, 122, 126, 0.15)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { min: 1, max: 5, ticks: { stepSize: 1 } },
    },
  };

  return <Line data={data} options={options} />;
}
