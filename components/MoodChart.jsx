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
  const labels = moods.map((m) =>
    new Date(m.created_at).toLocaleDateString()
  );

  const values = moods.map((m) => m.mood_value);

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
  };

  return <Line data={data} options={options} />;
}
