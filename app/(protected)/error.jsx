"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center space-y-4">

      <div className="w-full max-w-sm bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
        <p className="text-sm text-red-600 mt-1">
          {error?.message || "An unexpected error occurred."}
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#0D7A7E] text-white rounded-xl font-medium hover:bg-[#0B666A] transition"
      >
        Try Again
      </button>

    </div>
  );
}
