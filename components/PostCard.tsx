
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
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-4 overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-gray-100">
            <img src={post.user?.avatar || `https://picsum.photos/seed/${post.userId}/100/100`} alt="User" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-gray-900 text-sm">{post.user?.name}</p>
              <i className="fas fa-certificate text-black text-[10px]"></i>
            </div>
            <p className="text-xs text-gray-500">@{post.user?.username} • {formatTimestamp(post.timestamp)}</p>
          </div>
          <button className="text-gray-300 hover:text-gray-600 transition-colors">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap font-medium">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-4 border border-gray-50">
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 group transition-colors ${isLiked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
          >
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${isLiked ? 'bg-rose-50' : 'group-hover:bg-rose-50'}`}>
              <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-lg`}></i>
            </div>
            <span className="text-xs font-bold">{likesCount}</span>
          </button>

          <button className="flex items-center space-x-2 group text-gray-400 hover:text-black transition-colors">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl group-hover:bg-gray-100 transition-colors">
              <i className="far fa-comment text-lg"></i>
            </div>
            <span className="text-xs font-bold">{post.comments}</span>
          </button>

          <button className="flex items-center space-x-2 group text-gray-400 hover:text-emerald-500 transition-colors">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl group-hover:bg-emerald-50 transition-colors">
              <i className="far fa-paper-plane text-lg"></i>
            </div>
            <span className="text-xs font-bold hidden sm:inline">Share</span>
          </button>

          <button className="flex items-center space-x-2 group text-gray-400 hover:text-amber-500 transition-colors">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl group-hover:bg-amber-50 transition-colors">
              <i className="far fa-bookmark text-lg"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
