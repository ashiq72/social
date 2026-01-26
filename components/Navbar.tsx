
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/60 px-4 py-1.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white shadow-sm transition-transform">
            <i className="fas fa-bolt text-sm"></i>
          </div>
          <span className="text-lg font-extrabold text-black hidden sm:block tracking-tight">
            VibeStream
          </span>
        </Link>

        <div className="flex-1 max-w-sm mx-6 hidden md:block">
          <div className="relative group">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-100/70 border-none focus:ring-1 focus:ring-black/5 rounded-xl py-1.5 pl-9 pr-4 text-xs transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1.5 md:space-x-3">
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors relative">
            <i className="far fa-bell text-base"></i>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full border border-white"></span>
          </button>
          <Link to="/messages" className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors flex items-center justify-center">
            <i className="far fa-envelope text-base"></i>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 p-1 pr-2 rounded-lg hover:bg-gray-100 transition-colors border border-transparent">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-gray-200">
              <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" />
            </div>
            <span className="text-xs font-bold text-gray-700 hidden lg:block">Alex R.</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
