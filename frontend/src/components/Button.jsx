export default function Button({ children, onClick, isLoading = false, className = '', variant = 'primary' }) {
  const baseClasses = 'px-5 py-2.5 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  };

  return (
    <button onClick={onClick} disabled={isLoading} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {isLoading ? 'Processing...' : children}
    </button>
  );
}