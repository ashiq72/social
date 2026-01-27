
import React from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService.ts';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-100 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
            <i className="fas fa-bolt text-sm"></i>
          </div>
          <span className="text-lg font-extrabold text-black hidden sm:block tracking-tight">
            VibeStream
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <i className="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-colors group-focus-within:text-black"></i>
            <input 
              type="text" 
              placeholder="Search people, vibes..." 
              className="w-full bg-slate-50 border border-transparent focus:border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 rounded-2xl py-2.5 pl-11 pr-5 text-sm transition-all outline-none text-black font-bold placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <button 
            onClick={() => apiService.logout()}
            className="w-10 h-10 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all flex items-center justify-center"
            title="Logout"
          >
            <i className="fas fa-arrow-right-from-bracket text-lg"></i>
          </button>
          
          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-500 transition-all relative flex items-center justify-center">
            <i className="far fa-bell text-lg"></i>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <Link to="/profile" className="flex items-center space-x-3 p-1 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm">
              <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-slate-800 leading-none">Vibe User</p>
              <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Online</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
