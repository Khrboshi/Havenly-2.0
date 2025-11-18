export default function DailyNudge({ message }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm my-4">
      <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
    </div>
  );
}
