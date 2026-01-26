
import React, { useState } from 'react';
import { Post } from '../types';

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
    }, 400);
  };

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-50 shadow-sm mb-2">
      <div className="flex space-x-2.5">
        <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border border-gray-50">
          <img src="https://picsum.photos/seed/alex/100/100" alt="avatar" />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border-none focus:ring-0 text-[11px] text-gray-800 bg-transparent resize-none h-12 placeholder-gray-400 font-medium leading-normal"
          ></textarea>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-0.5">
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-lg transition-colors hover:text-black">
                <i className="far fa-image text-[10px]"></i>
              </button>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-lg transition-colors hover:text-black">
                <i className="far fa-smile text-[10px]"></i>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim() || isPosting}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-50 disabled:text-gray-300 text-white font-bold py-1 px-3.5 rounded-lg transition-all text-[9px] uppercase tracking-wider"
            >
              {isPosting ? '...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
