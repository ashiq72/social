
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './views/Home.tsx';
import Profile from './views/Profile.tsx';
import Messages from './views/Messages.tsx';
import Login from './views/Login.tsx';
import { useAuth, AuthProvider } from './context/AuthContext.tsx';

// Defined children as optional to resolve TypeScript strictness issues in nested JSX structures
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const ExploreView = () => (
  <div className="bg-white rounded-[32px] p-8 md:p-16 text-center border border-slate-100 shadow-sm">
    <div className="w-20 h-20 bg-slate-50 text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
      <i className="fas fa-compass text-4xl"></i>
    </div>
    <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-slate-900">Explore Trends</h2>
    <p className="text-slate-500 max-w-sm mx-auto mb-12 font-semibold text-sm leading-relaxed">AI-curated topics based on the collective vibes of the community.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {['Monochrome', 'React2025', 'DigitalArt', 'FutureTech', 'Minimalism', 'UrbanTravel'].map(cat => (
        <div key={cat} className="p-5 bg-slate-50 rounded-2xl hover:bg-black hover:text-white cursor-pointer transition-all border border-slate-100 hover:border-black flex items-center justify-between group">
          <span className="font-bold text-sm uppercase tracking-tight">#{cat}</span>
          <i className="fas fa-chevron-right opacity-0 group-hover:opacity-100 transition-all text-xs"></i>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-20">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
      <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Activity</h2>
      <button className="text-xs font-bold text-slate-400 hover:text-black uppercase tracking-widest transition-colors">Mark all as read</button>
    </div>
    <div className="divide-y divide-slate-50">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-6 flex items-center space-x-5 hover:bg-slate-50/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-2xl bg-white flex-shrink-0 overflow-hidden shadow-sm border border-slate-100">
            <img src={`https://picsum.photos/seed/notif${i}/200/200`} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-slate-800 font-semibold text-sm leading-tight">
              <span className="font-bold text-black uppercase mr-1">Jordan_Dev</span> liked your post about <span className="text-black font-extrabold underline decoration-slate-200">#MinimalistUI</span>.
            </p>
            <p className="text-[11px] font-bold text-slate-400 uppercase mt-1.5 tracking-wider">30m ago</p>
          </div>
          <div className="w-2.5 h-2.5 bg-black rounded-full transition-all group-hover:scale-125 opacity-0 group-hover:opacity-100"></div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider> {/* Wrap the entire application with AuthProvider */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExploreView />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/notifications" element={<NotificationsView />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;