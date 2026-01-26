
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
    
    // Simulate network delay
    setTimeout(() => {
      onPostCreated(newPost);
      setContent('');
      setIsPosting(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner ring-2 ring-gray-100">
          <img src="https://picsum.photos/seed/alex/100/100" alt="avatar" />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your vibe today?"
            className="w-full border-none focus:ring-0 text-lg text-gray-800 bg-white resize-none h-28 placeholder-gray-400 font-medium leading-relaxed"
          ></textarea>
          
          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-xl transition-colors hover:text-black">
                <i className="far fa-image text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-xl transition-colors hover:text-black">
                <i className="far fa-smile text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-xl transition-colors hover:text-black">
                <i className="fas fa-hashtag text-lg"></i>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim() || isPosting}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 text-white font-black py-2.5 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-gray-200 active:scale-95"
            >
              {isPosting ? 'Posting...' : 'Post Vibe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
