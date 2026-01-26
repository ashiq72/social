
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <span className="text-xl font-bold text-black hidden sm:block">
            VibeStream
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search vibes, people, or tags..." 
              className="w-full bg-gray-100/50 border-none focus:ring-2 focus:ring-black/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm transition-all outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-md">⌘</span>
              <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-md">K</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative">
            <i className="far fa-bell text-lg"></i>
            <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
          </button>
          <Link to="/messages" className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 transition-colors flex items-center justify-center">
            <i className="far fa-envelope text-lg"></i>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" />
            </div>
            <span className="text-sm font-semibold text-gray-700 hidden lg:block">Alex R.</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
