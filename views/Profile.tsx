
import React, { useState } from 'react';

const HIGHLIGHTS = [
  { id: 'h1', title: 'Work', icon: 'fa-briefcase', color: 'bg-blue-500' },
  { id: 'h2', title: 'Travel', icon: 'fa-plane', color: 'bg-emerald-500' },
  { id: 'h3', title: 'Code', icon: 'fa-code', color: 'bg-indigo-600' },
  { id: 'h4', title: 'Vibes', icon: 'fa-bolt', color: 'bg-amber-400' },
];

const SKILLS = ['React', 'TypeScript', 'Node.js', 'UI/UX', 'Python'];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const stats = [
    { label: 'Posts', value: '152' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '850' }
  ];

  return (
    <div className="space-y-6 pb-20 w-full">
      {/* 1. COMPACT HEADER SECTION */}
      <div className="relative">
        <div className="h-40 md:h-56 rounded-xl overflow-hidden relative shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="px-4 md:px-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-5">
              <div className="relative group mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-white p-1 shadow-md overflow-hidden ring-4 ring-slate-50 relative">
                  <img 
                    src="https://picsum.photos/seed/alex/500/500" 
                    className="rounded-lg w-full h-full object-cover" 
                    alt="Avatar" 
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-7 h-7 bg-black border-2 border-white rounded-lg shadow flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-[10px]"></i>
                </div>
              </div>

              <div className="text-center md:text-left mb-1">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <h1 className="text-xl font-black text-gray-900 tracking-tight">Alex Rivera</h1>
                  <i className="fas fa-check-circle text-blue-500 text-xs"></i>
                </div>
                <p className="text-gray-500 font-bold text-xs tracking-tight">@arivera_vibes</p>
              </div>
            </div>

            <div className="flex space-x-2 pb-1">
              <button className="px-5 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-bold transition-all text-[9px] uppercase tracking-wider flex items-center">
                <i className="fas fa-edit mr-2"></i>
                Edit
              </button>
              <button className="w-9 h-9 bg-white hover:bg-gray-50 text-gray-900 rounded-lg flex items-center justify-center transition-all border border-gray-100 shadow-sm">
                <i className="fas fa-share-alt text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS & BIO CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-gray-50 shadow-sm flex flex-col justify-between space-y-5">
          <div className="flex justify-between w-full items-center px-2">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-base font-black text-gray-900">{stat.value}</p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-50">
             <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3">Highlights</h3>
             <div className="flex space-x-3 overflow-x-auto no-scrollbar">
               {HIGHLIGHTS.map(h => (
                 <div key={h.id} className="flex-shrink-0 flex flex-col items-center space-y-1 cursor-pointer">
                   <div className={`w-9 h-9 rounded-lg ${h.color} p-0.5`}>
                     <div className="w-full h-full rounded-md bg-white flex items-center justify-center">
                       <i className={`fas ${h.icon} text-[10px] text-gray-800`}></i>
                     </div>
                   </div>
                   <span className="text-[7px] font-bold uppercase text-gray-500">{h.title}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-gray-50 shadow-sm">
          <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">Vision</h3>
          <p className="text-gray-700 font-medium text-base leading-snug italic">
            "Frontend enthusiast. Exploring the world one line of code at a time. 🚀 Building the future of vibes through intentional design."
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-bold uppercase tracking-wider border border-gray-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONTENT TABS AREA - No border as requested */}
      <div className="space-y-4">
        <div className="flex space-x-6 px-1">
          {['Posts', 'Media'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.toLowerCase() 
                ? 'text-black' 
                : 'text-gray-400 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 gap-3">
              {[1].map(i => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-50 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-black font-black border border-gray-100 text-xs">
                        AR
                      </div>
                      <div>
                        <p className="font-bold text-xs text-gray-900">Alex Rivera</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase">3h ago</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-800 text-xs font-medium leading-normal">
                    Exploring the intersection of AI-driven design systems and user emotional response. It's about the feeling. ✨
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-50 group cursor-pointer shadow-sm">
                  <img 
                    src={`https://picsum.photos/seed/prof-media-${i}/600/600`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt="Media" 
                  />
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
