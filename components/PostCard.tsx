
import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { apiService } from '../services/apiService.ts';

interface PostCardProps {
  post: Post;
  onDeleteSuccess: (deletedPostId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDeleteSuccess }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { currentUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const isOwner = currentUser?.id === post.userId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if click is outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      // If the modal is open, prevent clicks on the dropdown toggle from bubbling up
      if (showConfirmModal && deleteButtonRef.current && deleteButtonRef.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, showConfirmModal]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleting(true);
    try {
      const token = apiService.getToken();
      if (!token) throw new Error('Authentication token not found.');

      await apiService.deletePost(post.id, token);
      onDeleteSuccess(post.id); // Notify parent component to remove the post
    } catch (error: any) {
      console.error('Failed to delete post:', error);
      alert(`Error deleting post: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setShowConfirmModal(false); // Close modal even if there's an error
    }
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-900 transition-all flex items-center justify-center"
              title="More Options"
              aria-label="More options for this post"
              aria-expanded={showDropdown}
            >
              <i className="fas fa-ellipsis text-lg"></i>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-20 animate-in fade-in slide-in-from-top-1">
                {isOwner && (
                  <button
                    onClick={() => {
                      setShowConfirmModal(true);
                      setShowDropdown(false); // Close dropdown when modal opens
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-t-xl transition-colors"
                    ref={deleteButtonRef}
                  >
                    <i className="fas fa-trash-can mr-2"></i> Delete Post
                  </button>
                )}
                <button className="flex items-center w-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-b-xl transition-colors">
                  <i className="fas fa-flag mr-2"></i> Report Post
                </button>
              </div>
            )}
          </div>
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
              aria-label={`Like post, currently ${likesCount} likes`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-xl`}></i>
              </div>
              <span className="text-sm font-bold">{likesCount}</span>
            </button>

            <button className="flex items-center space-x-2.5 text-slate-400 hover:text-blue-500 transition-all group" aria-label={`${post.comments} comments`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                <i className="far fa-comment text-xl"></i>
              </div>
              <span className="text-sm font-bold">{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-all" aria-label="Share post">
              <i className="far fa-share-from-square text-lg"></i>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-black hover:bg-slate-100 transition-all" aria-label="Bookmark post">
              <i className="far fa-bookmark text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full animate-in fade-in slide-in-from-bottom-8">
            <h3 id="delete-modal-title" className="text-xl font-extrabold text-slate-900 mb-4 text-center">Delete Post</h3>
            <p className="text-slate-700 text-center mb-6 leading-relaxed">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all text-sm active:scale-95"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                disabled={isDeleting}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-rose-600/20 active:scale-95 flex items-center justify-center"
              >
                {isDeleting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
