export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border rounded-xl p-5 shadow-card ${className}`}>
      {children}
    </div>
  );
}
