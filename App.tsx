
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './views/Home.tsx';
import Profile from './views/Profile.tsx';
import Messages from './views/Messages.tsx';

const ExploreView = () => (
  <div className="bg-white rounded-xl p-6 md:p-10 text-center border border-gray-50 shadow-sm">
    <div className="w-14 h-14 bg-gray-50 text-black rounded-xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-gray-100">
      <i className="fas fa-compass text-2xl"></i>
    </div>
    <h2 className="text-xl font-black mb-2 tracking-tight uppercase">Explore Trends</h2>
    <p className="text-gray-400 max-w-sm mx-auto mb-8 font-bold text-[10px] uppercase tracking-wider leading-relaxed">AI-curated topics based on the collective vibes of the community.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {['Monochrome', 'React2025', 'DigitalArt', 'FutureTech', 'Minimalism', 'UrbanTravel'].map(cat => (
        <div key={cat} className="p-3.5 bg-gray-50 rounded-lg hover:bg-black hover:text-white cursor-pointer transition-all border border-gray-100 hover:border-black flex items-center justify-between group">
          <span className="font-black text-[11px] uppercase tracking-tight">#{cat}</span>
          <i className="fas fa-chevron-right opacity-0 group-hover:opacity-100 transition-all text-[9px]"></i>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="bg-white rounded-xl border border-gray-50 shadow-sm overflow-hidden mb-20">
    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
      <h2 className="text-sm font-black uppercase tracking-tight">Alerts</h2>
      <button className="text-[9px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Mark all read</button>
    </div>
    <div className="divide-y divide-gray-50">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-4 flex items-center space-x-3.5 hover:bg-gray-50/50 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-white flex-shrink-0 overflow-hidden shadow-sm border border-gray-100">
            <img src={`https://picsum.photos/seed/notif${i}/200/200`} alt="User" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium text-[11px] leading-tight">
              <span className="font-black uppercase">Jordan_Dev</span> liked your post about <span className="text-black font-bold">#MinimalistUI</span>.
            </p>
            <p className="text-[8px] font-black text-gray-400 uppercase mt-1 tracking-wider">30m ago</p>
          </div>
          <div className="w-1.5 h-1.5 bg-black rounded-full transition-transform group-hover:scale-125"></div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export default App;
