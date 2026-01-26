
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
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm mb-6 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 group">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
              <img src={post.user?.avatar || `https://picsum.photos/seed/${post.userId}/200/200`} alt="User" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-black text-gray-900 text-sm">{post.user?.name}</p>
                <i className="fas fa-check-circle text-blue-500 text-[10px]"></i>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">@{post.user?.username} • {formatTimestamp(post.timestamp)}</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-black transition-all flex items-center justify-center">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <p className="text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap font-medium text-lg">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-[2rem] overflow-hidden mb-6 border border-gray-50 group-hover:scale-[1.01] transition-transform duration-700">
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[600px]" />
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-3 transition-all ${isLiked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
            >
              <div className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${isLiked ? 'bg-rose-50' : 'group-hover:bg-rose-50'}`}>
                <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-xl`}></i>
              </div>
              <span className="text-xs font-black">{likesCount}</span>
            </button>

            <button className="flex items-center space-x-3 text-gray-400 hover:text-black transition-all group/btn">
              <div className="w-11 h-11 flex items-center justify-center rounded-2xl group-hover/btn:bg-gray-100 transition-all">
                <i className="far fa-comment text-xl"></i>
              </div>
              <span className="text-xs font-black">{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all">
              <i className="far fa-paper-plane text-xl"></i>
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-2xl text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all">
              <i className="far fa-bookmark text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
