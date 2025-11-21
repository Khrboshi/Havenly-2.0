export default function ErrorFallback({
  message = "Something went wrong.",
  className = "",
}) {
  return (
    <div
      className={`bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm ${className}`}
    >
      {message}
    </div>
  );
}
