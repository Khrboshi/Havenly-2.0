export default function ErrorFallback({ message = "Something went wrong." }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
      {message}
    </div>
  );
}
