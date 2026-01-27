
import React, { useState } from 'react';
import { Post } from '../types.ts';

interface PostComposerProps {
  onPostCreated: (post: Post) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'u1',
      user: {
        name: 'Alex Rivera',
        username: 'arivera_vibes',
        avatar: 'https://picsum.photos/seed/alex/200/200'
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
          <img src="https://picsum.photos/seed/alex/100/100" alt="avatar" className="w-full h-full object-cover" />
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
              disabled={!content.trim() || isPosting}
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
