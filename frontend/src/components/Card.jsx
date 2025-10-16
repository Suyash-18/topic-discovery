export default function Card({ children, className = '' }) {
  // Added h-full to make cards in a grid have equal height
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full ${className}`}>
      {children}
    </div>
  );
}