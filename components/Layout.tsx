
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
    className={`flex items-center space-x-2.5 p-2 rounded-lg transition-all duration-200 ${
      active ? 'bg-black text-white shadow-sm font-bold' : 'text-gray-500 hover:bg-gray-100'
    }`}
  >
    <i className={`${icon} text-sm w-4 text-center`}></i>
    <span className="text-[11px] font-bold uppercase tracking-tight">{label}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMessageView = location.pathname === '/messages';
  const isProfileView = location.pathname === '/profile';
  
  const hideSidebars = isMessageView || isProfileView;
  const mainWidthClass = isProfileView ? 'max-w-4xl' : 'max-w-xl';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex max-w-6xl mx-auto w-full relative">
        {!hideSidebars && (
          <aside className="hidden md:flex flex-col w-48 p-4 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
            <nav className="space-y-1">
              <NavItem to="/" icon="fas fa-home" label="Feed" active={location.pathname === '/'} />
              <NavItem to="/explore" icon="fas fa-compass" label="Explore" active={location.pathname === '/explore'} />
              <NavItem to="/messages" icon="fas fa-envelope" label="Messages" active={isMessageView} />
              <NavItem to="/notifications" icon="fas fa-bell" label="Alerts" active={location.pathname === '/notifications'} />
              <NavItem to="/profile" icon="fas fa-user-circle" label="Profile" active={isProfileView} />
            </nav>
          </aside>
        )}

        <main className={`flex-1 px-4 py-4 md:px-6 overflow-x-hidden mx-auto w-full ${isMessageView ? 'max-w-none' : mainWidthClass}`}>
          {children}
        </main>

        {!hideSidebars && (
          <aside className="hidden lg:flex flex-col w-56 p-4 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
            <div className="bg-white rounded-xl p-3 border border-gray-50 shadow-sm mb-4">
              <h2 className="text-[9px] font-black text-gray-400 mb-3 flex items-center uppercase tracking-widest">
                Trending
              </h2>
              <div className="space-y-2.5">
                {[
                  { tag: 'Monochrome', count: '14.2k' },
                  { tag: 'ReactConf', count: '9.1k' },
                  { tag: 'AI_Vibes', count: '5.8k' }
                ].map(item => (
                  <div key={item.tag} className="group cursor-pointer">
                    <p className="text-[11px] font-bold text-gray-800 group-hover:text-black transition-colors">#{item.tag}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase">{item.count} vibing</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-gray-100 flex justify-around py-2 px-2 z-50">
        <Link to="/" className={`p-2 rounded-lg ${location.pathname === '/' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-home text-base"></i>
        </Link>
        <Link to="/explore" className={`p-2 rounded-lg ${location.pathname === '/explore' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-search text-base"></i>
        </Link>
        <Link to="/messages" className={`p-2 rounded-lg ${location.pathname === '/messages' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-envelope text-base"></i>
        </Link>
        <Link to="/profile" className={`p-2 rounded-lg ${location.pathname === '/profile' ? 'text-black' : 'text-gray-400'}`}>
          <i className="fas fa-user text-base"></i>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
