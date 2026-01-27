
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';

const HIGHLIGHTS = [
  { id: 'h1', title: 'Work', icon: 'fa-briefcase', color: 'bg-blue-500' },
  { id: 'h2', title: 'Travel', icon: 'fa-plane', color: 'bg-emerald-500' },
  { id: 'h3', title: 'Code', icon: 'fa-code', color: 'bg-indigo-600' },
  { id: 'h4', title: 'Vibes', icon: 'fa-bolt', color: 'bg-amber-400' },
];

const SKILLS = ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Python'];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const { currentUser } = useAuth();

  const stats = [
    { label: 'Posts', value: '152' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '850' }
  ];

  return (
    <div className="space-y-6 pb-20 w-full">
      {/* 1. HEADER SECTION */}
      <div className="relative">
        <div className="h-48 md:h-64 rounded-3xl overflow-hidden relative shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="px-6 md:px-12 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-8">
              <div className="relative group mx-auto md:mx-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[36px] bg-white p-1.5 shadow-xl overflow-hidden ring-8 ring-[#fbfcfd] relative">
                  <img 
                    src={currentUser?.avatar || "https://picsum.photos/seed/default/500/500"} 
                    className="rounded-[30px] w-full h-full object-cover" 
                    alt="Avatar" 
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-black border-4 border-white rounded-2xl shadow-lg flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-sm"></i>
                </div>
              </div>

              <div className="text-center md:text-left mb-2">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{currentUser?.name || 'Vibe User'}</h1>
                  <i className="fas fa-circle-check text-blue-500 text-lg"></i>
                </div>
                <p className="text-slate-500 font-semibold text-sm mt-1">@{currentUser?.username || 'vibestreamer'}</p>
              </div>
            </div>

            <div className="flex space-x-3 pb-2 justify-center">
              <button className="px-7 py-2.5 bg-black hover:bg-slate-800 text-white rounded-xl font-bold transition-all text-sm shadow-xl shadow-black/10 active:scale-95 flex items-center">
                <i className="fas fa-pen-to-square mr-2.5"></i>
                Edit profile
              </button>
              <button className="w-11 h-11 bg-white hover:bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center transition-all border border-slate-100 shadow-sm active:scale-95">
                <i className="fas fa-share-nodes text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS & BIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
          <div className="flex justify-between w-full items-center px-4">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-50">
             <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Daily Vibes</h3>
             <div className="flex space-x-4 overflow-x-auto no-scrollbar">
               {HIGHLIGHTS.map(h => (
                 <div key={h.id} className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group">
                   <div className={`w-12 h-12 rounded-2xl ${h.color} p-0.5 shadow-sm group-hover:scale-105 transition-transform`}>
                     <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                       <i className={`fas ${h.icon} text-sm text-slate-800`}></i>
                     </div>
                   </div>
                   <span className="text-[10px] font-bold text-slate-500">{h.title}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Manifesto</h3>
          <p className="text-slate-700 font-medium text-base leading-relaxed">
            Crafting digital experiences that bridge the gap between human emotion and artificial intelligence. 🌐 Fullstack developer with a heart for minimalist design and clean code.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {SKILLS.map(skill => (
              <span key={skill} className="px-4 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[12px] font-bold border border-slate-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TABS */}
      <div className="space-y-6">
        <div className="flex space-x-8 px-2 border-b border-slate-100">
          {['Posts', 'Media', 'Likes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`text-sm font-bold tracking-tight transition-all pb-4 relative ${
                activeTab === tab.toLowerCase() ? 'text-black' : 'text-slate-400 hover:text-black'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full"></div>}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'posts' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
               <div className="flex items-center space-x-3 mb-4">
                 <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-sm">AR</div>
                 <p className="text-sm font-bold">Latest thoughts on React 19... 🚀</p>
               </div>
               <p className="text-slate-500 text-xs font-semibold">Pinned by you • 2 days ago</p>
            </div>
          )}
          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                  <img src={`https://picsum.photos/seed/media-${i}/600/600`} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;