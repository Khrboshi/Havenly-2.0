// components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-3 rounded-xl font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#0D7A7E] text-white hover:bg-[#096064] focus:ring-[#0D7A7E]",
    outline:
      "border border-[#0D7A7E] text-[#0D7A7E] hover:bg-[#E6F4F3] focus:ring-[#0D7A7E]",
    soft:
      "bg-[#E6F4F3] text-[#0D7A7E] hover:bg-[#C8E8E5] focus:ring-[#0D7A7E]",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
