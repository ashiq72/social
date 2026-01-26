
import React, { useState } from 'react';

const HIGHLIGHTS = [
  { id: 'h1', title: 'Work', icon: 'fa-briefcase', color: 'bg-blue-500' },
  { id: 'h2', title: 'Travel', icon: 'fa-plane', color: 'bg-emerald-500' },
  { id: 'h3', title: 'Code', icon: 'fa-code', color: 'bg-indigo-600' },
  { id: 'h4', title: 'Vibes', icon: 'fa-bolt', color: 'bg-amber-400' },
];

const SKILLS = ['React', 'TypeScript', 'Node.js', 'UI/UX', 'Cloud Architecture', 'Python'];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const stats = [
    { label: 'Posts', value: '152' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '850' }
  ];

  return (
    <div className="space-y-8 pb-32 max-w-5xl mx-auto">
      {/* 1. PREMIUM HEADER SECTION */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-96 rounded-[3rem] overflow-hidden relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Cover Action */}
          <button className="absolute bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20 flex items-center space-x-2">
            <i className="fas fa-camera"></i>
            <span>Update Cover</span>
          </button>
        </div>

        {/* Profile Identity (Overlapping) */}
        <div className="px-8 md:px-16 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-end md:justify-between space-y-6 md:space-y-0">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto">
              <div className="relative group">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-[3.5rem] bg-white p-2 shadow-2xl overflow-hidden ring-[12px] ring-slate-50 relative">
                  <img 
                    src="https://picsum.photos/seed/alex/500/500" 
                    className="rounded-[2.8rem] w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="Avatar" 
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-black border-4 border-white rounded-3xl shadow-xl flex items-center justify-center">
                  <i className="fas fa-bolt text-white text-lg"></i>
                </div>
              </div>

              <div className="text-center md:text-left md:pb-6">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Alex Rivera</h1>
                  <i className="fas fa-check-circle text-blue-500 text-2xl"></i>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <p className="text-gray-500 font-bold text-lg">@arivera_vibes</p>
                  <span className="bg-black text-white px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">PRO MEMBER</span>
                </div>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex space-x-3 md:pb-6 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-10 py-4 bg-black hover:bg-gray-800 text-white rounded-[1.5rem] font-black transition-all text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-400 active:scale-95 flex items-center justify-center">
                <i className="fas fa-edit mr-3"></i>
                Edit Profile
              </button>
              <button className="w-14 h-14 bg-white hover:bg-gray-50 text-gray-900 rounded-[1.5rem] flex items-center justify-center transition-all border border-gray-100 shadow-lg">
                <i className="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BIO & STATS BAR - FULL WIDTH & ORGANIZED */}
      <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Section - Left (Small & Width Full concept) */}
          <div className="lg:col-span-7">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Core Signal</h3>
            <p className="text-gray-600 font-medium text-lg leading-relaxed italic">
              "Digital nomad & Frontend enthusiast. Exploring the world one line of code at a time. 🚀 Building the future of social vibes through decentralized interfaces."
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SKILLS.map(skill => (
                <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-wider border border-gray-100 hover:border-black hover:text-black transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section - Right */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center group p-6 rounded-[2rem] bg-slate-50 border border-gray-100 hover:bg-white hover:border-black transition-all">
                <p className="text-3xl font-black text-gray-900 mb-1 group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. HIGHLIGHTS & CONTENT NAVIGATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* SIDEBAR - About & Socials */}
        <div className="space-y-8">
          {/* Featured Highlights */}
          <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Highlights</h3>
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-2">
              {HIGHLIGHTS.map(h => (
                <div key={h.id} className="flex-shrink-0 flex flex-col items-center space-y-3 cursor-pointer group">
                  <div className={`w-20 h-20 rounded-[2.2rem] ${h.color} p-0.5 transition-transform group-hover:-rotate-12 duration-500`}>
                    <div className="w-full h-full rounded-[2rem] bg-white flex items-center justify-center">
                      <i className={`fas ${h.icon} text-xl text-gray-800`}></i>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">{h.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Identity Metadata */}
          <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Signal Data</h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                  <p className="text-sm font-bold text-gray-800">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                  <i className="fas fa-link"></i>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Digital Hub</p>
                  <a href="#" className="text-sm font-bold text-gray-800 hover:underline">alexrivera.dev</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                  <i className="far fa-calendar-alt"></i>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Timeline</p>
                  <p className="text-sm font-bold text-gray-800">Joined Jan 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Mini Section */}
          <div className="bg-gray-900 rounded-[3rem] p-8 text-white">
            <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Recent Connection</h3>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden bg-gray-800">
                  <img src={`https://picsum.photos/seed/friend${i}/100/100`} alt="Friend" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-white text-black flex items-center justify-center text-[10px] font-black">
                +12
              </div>
            </div>
            <p className="mt-4 text-[10px] font-medium text-gray-400 leading-relaxed">
              Followed by <span className="text-white font-bold">Sarah Chen</span> and 84 others you vibe with.
            </p>
          </div>
        </div>

        {/* MAIN FEED AREA */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-[2.5rem] p-2 flex border border-gray-100 shadow-sm sticky top-20 z-40 glass">
            {['Posts', 'Media', 'Collections', 'Likes'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab.toLowerCase() 
                  ? 'bg-black text-white shadow-xl shadow-gray-200' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Content Grid */}
          <div className="space-y-6">
            {activeTab === 'posts' && (
              <>
                {[1, 2].map(i => (
                  <div key={i} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 group">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black font-black border border-gray-100">
                          AR
                        </div>
                        <div>
                          <p className="font-black text-gray-900">Alex Rivera</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">3h ago • Public</p>
                        </div>
                      </div>
                      <button className="text-gray-300 hover:text-black transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </div>
                    
                    <p className="text-gray-800 text-lg font-medium leading-relaxed mb-8">
                      {i === 1 
                        ? "Exploring the intersection of AI-driven design systems and user emotional response. It's not just about pixels anymore; it's about the feeling. 🧠✨" 
                        : "Current setup status: Minimalist to the core. Clarity in space = Clarity in code."}
                    </p>

                    {i === 1 && (
                      <div className="rounded-[2.5rem] overflow-hidden mb-8 border border-gray-50 group-hover:scale-[1.01] transition-transform duration-700">
                        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" alt="Post Visual" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                      <div className="flex items-center space-x-8">
                        <button className="flex items-center space-x-3 text-gray-400 hover:text-rose-500 transition-all group/btn">
                          <i className="far fa-heart text-2xl group-hover/btn:scale-125 transition-transform"></i>
                          <span className="text-xs font-black">248</span>
                        </button>
                        <button className="flex items-center space-x-3 text-gray-400 hover:text-black transition-all">
                          <i className="far fa-comment text-2xl"></i>
                          <span className="text-xs font-black">42</span>
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-black transition-all">
                        <i className="far fa-bookmark text-2xl"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === 'media' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm relative group cursor-pointer">
                    <img 
                      src={`https://picsum.photos/seed/prof-media-${i}/600/600`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt="Media" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center space-x-6">
                      <div className="text-center text-white">
                        <i className="fas fa-heart mb-2 text-xl"></i>
                        <p className="text-[10px] font-black">840</p>
                      </div>
                      <div className="text-center text-white">
                        <i className="fas fa-comment mb-2 text-xl"></i>
                        <p className="text-[10px] font-black">24</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(activeTab === 'collections' || activeTab === 'likes') && (
              <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                  <i className={`fas ${activeTab === 'likes' ? 'fa-heart' : 'fa-folder-open'} text-4xl text-gray-200`}></i>
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">Vault is empty</h3>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Signal processing in progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
