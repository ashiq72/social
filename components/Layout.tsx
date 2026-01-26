
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-4 p-3 rounded-2xl transition-all duration-200 ${
      active ? 'bg-black text-white shadow-lg shadow-gray-200 font-bold' : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    <i className={`${icon} text-lg w-6 text-center`}></i>
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMessageView = location.pathname === '/messages';
  const isProfileView = location.pathname === '/profile';
  const hideSidebars = isMessageView || isProfileView;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar - Desktop (Hidden on Profile and Messages) */}
        {!hideSidebars && (
          <aside className="hidden md:flex flex-col w-64 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="space-y-2">
              <NavItem to="/" icon="fas fa-home" label="Feed" active={location.pathname === '/'} />
              <NavItem to="/explore" icon="fas fa-compass" label="Explore" active={location.pathname === '/explore'} />
              <NavItem to="/messages" icon="fas fa-envelope" label="Messages" active={isMessageView} />
              <NavItem to="/notifications" icon="fas fa-bell" label="Alerts" active={location.pathname === '/notifications'} />
              <NavItem to="/profile" icon="fas fa-user-circle" label="Profile" active={location.pathname === '/profile'} />
            </nav>

            <div className="mt-auto p-5 bg-gray-900 rounded-3xl border border-black shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Vibe Plus</p>
              <p className="text-xs text-white mb-3">Get advanced AI analysis and reach more vibers.</p>
              <button className="w-full bg-white text-black py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
                Upgrade
              </button>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 px-4 py-6 md:px-8 overflow-x-hidden ${hideSidebars ? 'max-w-none' : 'max-w-2xl mx-auto'}`}>
          {children}
        </main>

        {/* Right Sidebar - Hidden in messages or profile for better focus */}
        {!hideSidebars && (
          <aside className="hidden lg:flex flex-col w-80 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-fire text-black mr-2"></i>
                Trending Now
              </h2>
              <div className="space-y-4">
                {[
                  { tag: 'Monochrome', count: '14.2k' },
                  { tag: 'ReactConf', count: '9.1k' },
                  { tag: 'AI_Vibes', count: '5.8k' }
                ].map(item => (
                  <div key={item.tag} className="group cursor-pointer">
                    <p className="font-bold text-gray-800 group-hover:text-black transition-colors">#{item.tag}</p>
                    <p className="text-xs text-gray-400">{item.count} vibing</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-gray-200 flex justify-around py-3 px-2 z-50">
        <Link to="/" className={`p-2 rounded-xl transition-colors ${location.pathname === '/' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-home text-xl"></i>
        </Link>
        <Link to="/explore" className={`p-2 rounded-xl transition-colors ${location.pathname === '/explore' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-search text-xl"></i>
        </Link>
        <Link to="/messages" className={`p-2 rounded-xl transition-colors ${location.pathname === '/messages' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-envelope text-xl"></i>
        </Link>
        <Link to="/notifications" className={`p-2 rounded-xl transition-colors ${location.pathname === '/notifications' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-bell text-xl"></i>
        </Link>
        <Link to="/profile" className={`p-2 rounded-xl transition-colors ${location.pathname === '/profile' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-user text-xl"></i>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
