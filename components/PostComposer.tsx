
import React, { useState } from 'react';
import { Post } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface PostComposerProps {
  onPostCreated: (post: Post) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { currentUser } = useAuth(); // Get current user

  const handlePost = async () => {
    if (!content.trim() || !currentUser) return; // Ensure user is logged in
    setIsPosting(true);
    
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id, // Use current user ID from fetched data
      user: {
        name: currentUser.name,
        username: currentUser.username, // Use current user username from fetched data
        avatar: currentUser.avatar
      },
      content,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString()
    };
    
    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setIsPosting(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-5">
      <div className="flex space-x-4">
        <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
          <img src={currentUser?.avatar || "https://picsum.photos/seed/default/100/100"} alt="avatar" className="w-full h-full object-cover" /> {/* Display user avatar */}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full border-none focus:ring-0 text-[16px] text-black bg-transparent resize-none h-20 placeholder-slate-300 font-bold leading-relaxed"
          ></textarea>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 rounded-xl transition-all hover:text-black active:scale-95">
                <i className="far fa-image text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 rounded-xl transition-all hover:text-black active:scale-95">
                <i className="far fa-face-smile text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 rounded-xl transition-all hover:text-black active:scale-95">
                <i className="fas fa-list-ul text-lg"></i>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim() || isPosting || !currentUser} // Disable if no content, posting, or no user
              className="bg-black hover:bg-slate-800 disabled:opacity-30 text-white font-bold py-2.5 px-8 rounded-xl transition-all text-sm shadow-lg shadow-black/10 active:scale-95"
            >
              {isPosting ? 'Posting...' : 'Post vibe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;