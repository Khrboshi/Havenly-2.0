export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border rounded-xl p-6 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}
