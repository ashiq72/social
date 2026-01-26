
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100 px-4 py-1">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white shadow-sm">
            <i className="fas fa-bolt text-[10px]"></i>
          </div>
          <span className="text-sm font-black text-black hidden sm:block tracking-tighter uppercase">
            VibeStream
          </span>
        </Link>

        <div className="flex-1 max-w-xs mx-6 hidden md:block">
          <div className="relative group">
            <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[9px]"></i>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border border-gray-100 focus:border-gray-200 focus:ring-0 rounded-lg py-1 pl-7 pr-3 text-[10px] transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <button className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors relative">
            <i className="far fa-bell text-sm"></i>
            <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-black rounded-full border border-white"></span>
          </button>
          <Link to="/messages" className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex items-center justify-center">
            <i className="far fa-envelope text-sm"></i>
          </Link>
          <Link to="/profile" className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 rounded-lg overflow-hidden border border-gray-100">
              <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" />
            </div>
            <span className="text-[10px] font-bold text-gray-700 hidden lg:block uppercase tracking-tight">Alex Rivera</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
