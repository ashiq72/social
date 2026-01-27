
import React, { useState } from 'react';
import PostComposer from '../components/PostComposer.tsx';
import PostCard from '../components/PostCard.tsx';
import { Post } from '../types.ts';

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: { name: 'Alex Rivera', username: 'arivera_vibes', avatar: 'https://picsum.photos/seed/alex/200/200' },
    content: "Design is not just what it looks like and feels like. Design is how it works. 🎨 Building something beautiful today.",
    likes: 256,
    comments: 24,
    timestamp: new Date().toISOString()
  },
  {
    id: 'p2',
    userId: 'u2',
    user: { name: 'Sarah Chen', username: 'schen_dev', avatar: 'https://picsum.photos/seed/sarah/200/200' },
    content: "The minimalist UI design is really coming together. Less is definitely more. ✨ #Frontend #VibeStream",
    likes: 142,
    comments: 15,
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
  const [activeTab, setActiveTab] = useState('for-you');

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Vibe Stories Reel */}
      <section className="flex space-x-5 overflow-x-auto no-scrollbar pb-2">
        <div className="flex-shrink-0 flex flex-col items-center space-y-2.5 group cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-black transition-colors group-hover:bg-white shadow-sm">
            <i className="fas fa-plus text-slate-400 group-hover:text-black text-sm"></i>
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-black transition-colors">You</span>
        </div>
        {VIBE_STORIES.map(story => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center space-y-2.5 cursor-pointer group">
            <div className={`w-16 h-16 rounded-2xl p-[3px] transition-transform group-hover:scale-105 duration-300 ${story.active ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600' : 'bg-slate-200'}`}>
              <div className="w-full h-full rounded-[13px] bg-white p-[2px] overflow-hidden">
                <img src={story.avatar} alt={story.user} className="w-full h-full object-cover rounded-[11px]" />
              </div>
            </div>
            <span className={`text-xs font-bold ${story.active ? 'text-black' : 'text-slate-400'}`}>
              {story.user}
            </span>
          </div>
        ))}
      </section>

      <PostComposer onPostCreated={handlePostCreated} />

      {/* Tabs */}
      <nav className="flex items-center space-x-8 px-1">
        <button 
          onClick={() => setActiveTab('for-you')}
          className={`text-sm font-bold tracking-tight transition-all relative py-2 ${activeTab === 'for-you' ? 'text-black' : 'text-slate-400 hover:text-slate-600'}`}
        >
          For you
          {activeTab === 'for-you' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('following')}
          className={`text-sm font-bold tracking-tight transition-all relative py-2 ${activeTab === 'following' ? 'text-black' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Following
          {activeTab === 'following' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-full"></div>}
        </button>
      </nav>
      
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
