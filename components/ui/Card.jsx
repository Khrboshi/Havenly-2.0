import { cn } from "@/lib/utils";

export default function Card({ children, className }) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
