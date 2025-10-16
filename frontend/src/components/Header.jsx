import { NavLink } from 'react-router-dom';

export default function Header() {
  const activeStyle = {
    backgroundColor: '#eef2ff', // indigo-50
    color: '#4f46e5', // indigo-600
    fontWeight: '600',
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">A</div>
            <span className="font-semibold text-gray-800 whitespace-nowrap">Anomalous Topic Discovery</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              Dashboard
            </NavLink>
            <NavLink to="/clusters" style={({ isActive }) => (isActive ? activeStyle : undefined)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100">
              Clusters
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-gray-600 hover:text-indigo-600">Docs</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Get Started</button>
        </div>
      </nav>
    </header>
  );
}