"use client";

import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base =
    "w-full py-3 rounded-xl font-medium transition text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    outline:
      "border border-brand text-brand hover:bg-brand-light hover:text-brand-dark bg-white",
    soft: "bg-brand-light text-brand-dark hover:bg-brand",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(base, variants[variant] ?? variants.primary, className)}
      {...props}
    >
      {children}
    </button>
  );
}
