// components/ui/Button.jsx
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "w-full py-3 rounded-xl font-medium transition text-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    outline: "border border-brand text-brand hover:bg-brand-light",
    soft: "bg-brand-light text-brand hover:bg-brand-dark",
    danger: "bg-red-600 text-white hover:bg-red-700",
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
