
import React, { useState, useEffect } from 'react';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import { Post } from '../types';

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: { name: 'Alex Rivera', username: 'arivera_vibes', avatar: 'https://picsum.photos/seed/alex/200/200' },
    content: "Building the future of social connections with a clean, decoupled architecture. 🚀 #VibeStream #FullStack",
    likes: 128,
    comments: 12,
    timestamp: new Date().toISOString()
  },
  {
    id: 'p2',
    userId: 'u2',
    user: { name: 'Sarah Chen', username: 'schen_dev', avatar: 'https://picsum.photos/seed/sarah/200/200' },
    content: "The minimalist UI design is really coming together. Less is definitely more. ✨",
    likes: 84,
    comments: 5,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

const VIBE_STORIES = [
  { id: 's1', user: 'Alex', avatar: 'https://picsum.photos/seed/alex/150/150', active: true },
  { id: 's2', user: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/150/150', active: true },
  { id: 's3', user: 'Jordan', avatar: 'https://picsum.photos/seed/jordan/150/150', active: false },
  { id: 's4', user: 'Maya', avatar: 'https://picsum.photos/seed/maya/150/150', active: true },
  { id: 's5', user: 'Kev', avatar: 'https://picsum.photos/seed/kev/150/150', active: false },
  { id: 's6', user: 'Luna', avatar: 'https://picsum.photos/seed/luna/150/150', active: true },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('for-you');

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

      <PostComposer onPostCreated={handlePostCreated} />

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
      
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}

        {posts.length === 0 && (
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-dashed border-gray-200 text-gray-500">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-wind text-3xl text-gray-200"></i>
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-2 tracking-tight">Vibe check: Empty.</h3>
            <p className="font-medium text-gray-400 text-sm mb-8">The feed is waiting for your unique signal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
