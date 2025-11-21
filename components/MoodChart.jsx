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

export default function MoodChart({ moods = [] }) {
  if (!moods.length) {
    return (
      <p className="text-xs text-gray-500">
        No mood data yet. Log your mood to see your trends here.
      </p>
    );
  }

  const labels = moods.map((m) =>
    new Date(m.created_at).toLocaleDateString()
  );

  const values = moods.map((m) => m.mood_value ?? m.score ?? 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: values,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { min: 1, max: 10, ticks: { stepSize: 1 } },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Mood: ${ctx.parsed.y}`,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
