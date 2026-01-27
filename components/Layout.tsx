
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar.tsx';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 ${
      active ? 'bg-black text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <i className={`${icon} text-lg w-6 text-center`}></i>
    <span className="text-[15px] font-semibold tracking-tight">{label}</span>
  </Link>
);

// Changed to optional children to resolve strict TypeScript prop requirements
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMessageView = location.pathname === '/messages';
  const isProfileView = location.pathname === '/profile';
  
  const hideSidebars = isMessageView || isProfileView;
  const mainWidthClass = isProfileView ? 'max-w-4xl' : 'max-w-2xl';

  return (
    <div className="min-h-screen bg-[#fbfcfd] flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        {!hideSidebars && (
          <aside className="hidden md:flex flex-col w-64 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="space-y-2">
              <NavItem to="/" icon="fas fa-house" label="Home" active={location.pathname === '/'} />
              <NavItem to="/explore" icon="fas fa-magnifying-glass" label="Explore" active={location.pathname === '/explore'} />
              <NavItem to="/messages" icon="fas fa-paper-plane" label="Messages" active={isMessageView} />
              <NavItem to="/notifications" icon="fas fa-heart" label="Activity" active={location.pathname === '/notifications'} />
              <NavItem to="/profile" icon="fas fa-circle-user" label="Profile" active={isProfileView} />
            </nav>
          </aside>
        )}

        <main className={`flex-1 px-4 py-6 md:px-8 overflow-x-hidden mx-auto w-full ${isMessageView ? 'max-w-none' : mainWidthClass}`}>
          {children}
        </main>

        {!hideSidebars && (
          <aside className="hidden lg:flex flex-col w-72 p-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
              <h2 className="text-xs font-bold text-slate-400 mb-5 flex items-center uppercase tracking-[0.1em]">
                Trends for you
              </h2>
              <div className="space-y-5">
                {[
                  { tag: 'CreativeDesign', count: '24.2k' },
                  { tag: 'VibeStream', count: '12.8k' },
                  { tag: 'Minimalism', count: '8.4k' }
                ].map(item => (
                  <div key={item.tag} className="group cursor-pointer">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-black transition-colors">#{item.tag}</p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{item.count} posts</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-100 flex justify-around py-4 px-4 z-50 rounded-t-3xl shadow-2xl">
        <Link to="/" className={`p-2 transition-transform active:scale-90 ${location.pathname === '/' ? 'text-black' : 'text-slate-400'}`}>
          <i className="fas fa-house text-xl"></i>
        </Link>
        <Link to="/explore" className={`p-2 transition-transform active:scale-90 ${location.pathname === '/explore' ? 'text-black' : 'text-slate-400'}`}>
          <i className="fas fa-magnifying-glass text-xl"></i>
        </Link>
        <Link to="/messages" className={`p-2 transition-transform active:scale-90 ${location.pathname === '/messages' ? 'text-black' : 'text-slate-400'}`}>
          <i className="fas fa-paper-plane text-xl"></i>
        </Link>
        <Link to="/profile" className={`p-2 transition-transform active:scale-90 ${location.pathname === '/profile' ? 'text-black' : 'text-slate-400'}`}>
          <i className="fas fa-circle-user text-xl"></i>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
