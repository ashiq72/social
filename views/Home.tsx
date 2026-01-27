
import React, { useState, useEffect } from 'react';
import PostComposer from '../components/PostComposer.tsx';
import PostCard from '../components/PostCard.tsx';
import { Post } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { apiService } from '../services/apiService.ts';

const VIBE_STORIES = [
  { id: 's2', user: 'Sarah', avatar: 'https://picsum.photos/seed/sarah/150/150', active: true },
  { id: 's3', user: 'Jordan', avatar: 'https://picsum.photos/seed/jordan/150/150', active: false },
  { id: 's4', user: 'Maya', avatar: 'https://picsum.photos/seed/maya/150/150', active: true },
  { id: 's5', user: 'Kev', avatar: 'https://picsum.photos/seed/kev/150/150', active: false },
  { id: 's6', user: 'Luna', avatar: 'https://picsum.photos/seed/luna/150/150', active: true },
];

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('for-you');
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!isAuthenticated) {
        setIsLoadingPosts(false);
        setErrorPosts('Please log in to see posts.');
        setPosts([]);
        return;
      }

      setIsLoadingPosts(true);
      setErrorPosts(null);
      try {
        const token = apiService.getToken();
        if (!token) throw new Error('Authentication token not found.');
        
        const response = await apiService.getAllPosts(token);
        if (response.success && Array.isArray(response.data)) {
          const fetchedPosts: Post[] = response.data.map((p: any) => {
            const userDetails = p.user || {};
            const userId = userDetails._id || 'unknown_user_id';

            return {
              id: p._id,
              userId: userId,
              user: {
                name: userDetails.name || 'Unknown User',
                username: userDetails.username || userDetails.phone || 'anonymous',
                avatar: userDetails._id ? `https://picsum.photos/seed/${userDetails._id}/100/100` : `https://picsum.photos/seed/default/100/100`
              },
              content: p.text || p.description || '', // Use 'text' from schema
              image: p.image,
              likes: p.likes?.length || 0,
              comments: p.comments?.length || 0,
              timestamp: p.createdAt
            };
          });
          setPosts(fetchedPosts.reverse());
        } else {
          setErrorPosts(response.message || 'Failed to fetch posts.');
          setPosts([]);
        }
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setErrorPosts(err.message || 'Could not load posts.');
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      <section className="flex space-x-5 overflow-x-auto no-scrollbar pb-2">
        <div className="flex-shrink-0 flex flex-col items-center space-y-2.5 group cursor-pointer">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200 group-hover:border-black transition-colors group-hover:bg-white shadow-sm">
            {currentUser ? (
               <div className="w-full h-full rounded-[13px] bg-white p-[2px] overflow-hidden">
                 <img src={currentUser.avatar} alt="You" className="w-full h-full object-cover rounded-[11px]" />
               </div>
            ) : (
               <i className="fas fa-plus text-slate-400 group-hover:text-black text-sm"></i>
            )}
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-black transition-colors">{currentUser?.name || 'You'}</span>
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
      
      <div className="space-y-6 mt-6">
        {isLoadingPosts ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : errorPosts ? (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-center font-bold">
            {errorPosts}
          </div>
        ) : posts.length === 0 ? (
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 text-center font-bold">
            No posts found. Be the first to share a vibe!
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
