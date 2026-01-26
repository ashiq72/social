
import React, { useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-50 shadow-sm mb-2.5 overflow-hidden transition-all group">
      <div className="p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-gray-50">
              <img src={post.user?.avatar || `https://picsum.photos/seed/${post.userId}/200/200`} alt="User" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <p className="font-bold text-gray-900 text-[10px] leading-none uppercase tracking-tight">{post.user?.name}</p>
                <i className="fas fa-check-circle text-blue-500 text-[6px]"></i>
              </div>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">@{post.user?.username} • {formatTimestamp(post.timestamp)}</p>
            </div>
          </div>
          <button className="w-6 h-6 rounded-lg hover:bg-gray-50 text-gray-300 hover:text-black transition-all flex items-center justify-center">
            <i className="fas fa-ellipsis-h text-[10px]"></i>
          </button>
        </div>

        <p className="text-gray-800 leading-normal mb-2.5 whitespace-pre-wrap font-medium text-[11px]">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-lg overflow-hidden mb-2.5 border border-gray-50">
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[300px]" />
          </div>
        )}

        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
          <div className="flex items-center space-x-3.5">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1.5 transition-all ${isLiked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
            >
              <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-xs`}></i>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{likesCount}</span>
            </button>

            <button className="flex items-center space-x-1.5 text-gray-400 hover:text-black transition-all">
              <i className="far fa-comment text-xs"></i>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-0.5">
            <button className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:text-black hover:bg-gray-50 transition-all">
              <i className="far fa-paper-plane text-[10px]"></i>
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:text-black hover:bg-gray-50 transition-all">
              <i className="far fa-bookmark text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
