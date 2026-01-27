
import React, { useState } from 'react';
import { Post } from '../types.ts';

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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-hidden transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm border border-slate-50">
              <img src={post.user?.avatar || `https://picsum.photos/seed/${post.userId}/200/200`} alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <p className="font-bold text-slate-900 text-[15px] leading-none">{post.user?.name}</p>
                <i className="fas fa-circle-check text-blue-500 text-[10px]"></i>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-1">@{post.user?.username} • {formatTimestamp(post.timestamp)}</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-900 transition-all flex items-center justify-center">
            <i className="fas fa-ellipsis text-lg"></i>
          </button>
        </div>

        <p className="text-slate-800 leading-relaxed mb-5 whitespace-pre-wrap font-medium text-[16px]">
          {post.content}
        </p>

        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-5 border border-slate-50">
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[450px]" />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2.5 transition-all group ${isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-xl`}></i>
              </div>
              <span className="text-sm font-bold">{likesCount}</span>
            </button>

            <button className="flex items-center space-x-2.5 text-slate-400 hover:text-blue-500 transition-all group">
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <i className="far fa-comment text-xl"></i>
              </div>
              <span className="text-sm font-bold">{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-all">
              <i className="far fa-share-from-square text-lg"></i>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-all">
              <i className="far fa-bookmark text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
