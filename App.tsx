
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Messages from './views/Messages';

const ExploreView = () => (
  <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-sm">
    <div className="w-20 h-20 bg-gray-50 text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner ring-4 ring-black/5">
      <i className="fas fa-compass text-4xl"></i>
    </div>
    <h2 className="text-3xl font-black mb-3 tracking-tight">Explore Trends</h2>
    <p className="text-gray-500 max-w-sm mx-auto mb-10 font-bold leading-relaxed">AI-curated topics based on the collective vibes of the community.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {['Monochrome', 'React2025', 'DigitalArt', 'FutureTech', 'Minimalism', 'UrbanTravel'].map(cat => (
        <div key={cat} className="p-5 bg-gray-50 rounded-2xl hover:bg-black hover:text-white cursor-pointer transition-all border border-transparent hover:shadow-xl hover:shadow-gray-200 flex items-center justify-between group">
          <span className="font-black text-lg">#{cat}</span>
          <i className="fas fa-chevron-right opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"></i>
        </div>
      ))}
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-20">
    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
      <h2 className="text-2xl font-black">Alerts</h2>
      <button className="text-xs font-black text-gray-600 hover:text-black uppercase tracking-widest">Mark all as read</button>
    </div>
    <div className="divide-y divide-gray-50">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-6 flex items-center space-x-5 hover:bg-gray-50 transition-colors cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-white flex-shrink-0 overflow-hidden shadow-md ring-2 ring-gray-50">
            <img src={`https://picsum.photos/seed/notif${i}/200/200`} alt="User" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium">
              <span className="font-black">Jordan_Dev</span> liked your post about <span className="text-black font-bold">#SmartDrafts</span>.
            </p>
            <p className="text-[11px] font-black text-gray-400 uppercase mt-1.5 tracking-wider">30 minutes ago</p>
          </div>
          <div className="w-3 h-3 bg-black rounded-full shadow-lg shadow-gray-200 group-hover:scale-125 transition-transform"></div>
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
