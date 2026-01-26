
import React, { useState } from 'react';
import { enhanceDraft, analyzePostSentiment } from '../services/geminiService';
import { Post } from '../types';

interface PostComposerProps {
  onPostCreated: (post: Post) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [sentiment, setSentiment] = useState<{ sentiment: string; tone: string } | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleEnhance = async () => {
    if (!content) return;
    setIsEnhancing(true);
    const enhanced = await enhanceDraft(content);
    setContent(enhanced);
    setIsEnhancing(false);
  };

  const checkSentiment = async () => {
    if (!content) return;
    const res = await analyzePostSentiment(content);
    setSentiment(res);
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    setIsPosting(true);
    const newPost: Post = {
      id: Math.random().toString(),
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
      setSentiment(null);
      setIsPosting(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-6 transition-all duration-300">
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
          
          {sentiment && (
            <div className="flex items-center space-x-2 text-[10px] mb-3">
              <span className={`px-2 py-1 rounded-lg font-bold uppercase ${
                sentiment.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-600' : 
                sentiment.sentiment === 'Negative' ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-700'
              }`}>
                {sentiment.sentiment}
              </span>
              <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-lg font-bold uppercase">
                {sentiment.tone} Tone
              </span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center space-x-2">
              <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-xl transition-colors hover:text-black">
                <i className="far fa-image text-lg"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 text-gray-400 rounded-xl transition-colors hover:text-black">
                <i className="far fa-smile text-lg"></i>
              </button>
              <div className="w-px h-6 bg-gray-100 mx-1"></div>
              <button 
                onClick={handleEnhance}
                disabled={isEnhancing || !content}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-black hover:bg-gray-100 disabled:opacity-30 transition-all font-bold text-xs"
              >
                <i className={`fas fa-wand-magic-sparkles ${isEnhancing ? 'animate-pulse' : ''}`}></i>
                <span className="hidden sm:inline">Smart Draft</span>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim() || isPosting}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 text-white font-bold py-2 px-8 rounded-2xl transition-all duration-200 shadow-lg shadow-gray-200 active:scale-95"
            >
              {isPosting ? 'Sending...' : 'Post Vibe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
