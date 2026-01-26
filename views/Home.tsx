
import React, { useState, useEffect } from 'react';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../services/apiService';
import { Post } from '../types';

const VIBE_STORIES = [
  { id: 's1', user: 'Alex', avatar: 'https://picsum.photos/seed/alex/150/150', active: true },
  { id: 's2', user: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/150/150', active: true },
  { id: 's3', user: 'Jordan', avatar: 'https://picsum.photos/seed/jordan/150/150', active: false },
  { id: 's4', user: 'Maya', avatar: 'https://picsum.photos/seed/maya/150/150', active: true },
  { id: 's5', user: 'Kev', avatar: 'https://picsum.photos/seed/kev/150/150', active: false },
  { id: 's6', user: 'Luna', avatar: 'https://picsum.photos/seed/luna/150/150', active: true },
];

const SUGGESTED_USERS = [
  { id: 'u10', name: 'Design Maestro', handle: 'pixel_perfect', avatar: 'https://picsum.photos/seed/design/100/100' },
  { id: 'u11', name: 'Code Wizard', handle: 'js_guru', avatar: 'https://picsum.photos/seed/code/100/100' },
  { id: 'u12', name: 'Nature Lover', handle: 'wild_vibe', avatar: 'https://picsum.photos/seed/nature/100/100' },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('for-you');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-24 md:pb-12">
      {/* Vibe Stories Reel */}
      <section className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
        <div className="flex-shrink-0 flex flex-col items-center space-y-2 group cursor-pointer">
          <div className="w-16 h-16 rounded-[2rem] bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-black transition-colors">
            <i className="fas fa-plus text-gray-400 group-hover:text-black"></i>
          </div>
          <span className="text-[10px] font-black uppercase text-gray-400">You</span>
        </div>
        {VIBE_STORIES.map(story => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer group">
            <div className={`w-16 h-16 rounded-[2rem] p-0.5 transition-transform group-hover:scale-105 duration-300 ${story.active ? 'bg-gradient-to-tr from-black via-gray-700 to-gray-400' : 'bg-gray-200'}`}>
              <div className="w-full h-full rounded-[1.8rem] bg-white p-0.5 overflow-hidden">
                <img src={story.avatar} alt={story.user} className="w-full h-full object-cover rounded-[1.7rem]" />
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase ${story.active ? 'text-black' : 'text-gray-400'}`}>
              {story.user}
            </span>
          </div>
        ))}
      </section>

      {/* Main Composer Area */}
      <PostComposer onPostCreated={handlePostCreated} />

      {/* Feed Navigation */}
      <nav className="flex items-center space-x-8 border-b border-gray-100 pb-1">
        <button 
          onClick={() => setActiveTab('for-you')}
          className={`pb-3 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === 'for-you' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          For You
          {activeTab === 'for-you' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full shadow-lg"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('following')}
          className={`pb-3 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === 'following' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Following
          {activeTab === 'following' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full shadow-lg"></div>}
        </button>
      </nav>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-gray-400">
          <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
          <p className="font-bold text-gray-400 animate-pulse uppercase text-[10px] tracking-widest">Collecting the latest vibes...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.slice(0, 1).map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* Inline Suggested Users Section (Content Enrichment) */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 shadow-sm overflow-hidden relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">Grow Your Vibe</h3>
              <button className="text-[10px] font-black text-gray-400 hover:text-black uppercase">View All</button>
            </div>
            <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
              {SUGGESTED_USERS.map(user => (
                <div key={user.id} className="flex-shrink-0 w-44 bg-gray-50 rounded-3xl p-4 flex flex-col items-center text-center border border-transparent hover:border-gray-200 transition-all">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 border-2 border-white shadow-sm">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 mb-0.5 truncate w-full">{user.name}</h4>
                  <p className="text-[10px] text-gray-400 mb-4">@{user.handle}</p>
                  <button className="w-full bg-black hover:bg-gray-800 text-white text-[10px] font-bold py-2 rounded-xl transition-all shadow-md shadow-gray-200 active:scale-95">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
          </div>

          {posts.slice(1).map(post => (
            <PostCard key={post.id} post={post} />
          ))}

          {posts.length === 0 && (
            <div className="bg-white rounded-[2.5rem] p-16 text-center border border-dashed border-gray-200 text-gray-500">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-wind text-3xl text-gray-200"></i>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight">Vibe check: Empty.</h3>
              <p className="font-medium text-gray-400 text-sm mb-8">The feed is waiting for your unique signal.</p>
              <button className="bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                Start Vibing
              </button>
            </div>
          )}

          {/* Infinite Scroll Indicator */}
          {!isLoading && posts.length > 0 && (
            <div className="py-10 text-center">
              <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">End of the signal</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
