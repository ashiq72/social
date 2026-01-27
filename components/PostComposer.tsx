
import React, { useState, useRef } from 'react';
import { Post } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { apiService } from '../services/apiService.ts';

interface PostComposerProps {
  onPostCreated: (post: Post) => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !selectedImage) {
      setError('Post cannot be empty!');
      return;
    }
    if (!currentUser) {
      setError('You must be logged in to post.');
      return;
    }
    
    setIsPosting(true);
    setError('');

    try {
      const token = apiService.getToken();
      if (!token) throw new Error('No authentication token found.');

      const postTitle = content.trim().substring(0, 50) || 'New Vibe';
      const postText = content.trim();

      const response = await apiService.createPost(
        { title: postTitle, text: postText, image: selectedImage },
        token
      );

      if (response.success && response.data) {
        const newPost: Post = {
          id: response.data._id,
          userId: currentUser.id,
          user: {
            name: currentUser.name,
            username: currentUser.username,
            avatar: currentUser.avatar
          },
          content: response.data.text || response.data.description || postText,
          image: response.data.image,
          likes: 0,
          comments: 0,
          timestamp: response.data.createdAt || new Date().toISOString()
        };
        onPostCreated(newPost);
        setContent('');
        removeImage();
      } else {
        setError(response.message || 'Failed to create post');
      }
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err.message || 'Something went wrong while creating your post.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-5">
      <div className="flex space-x-4">
        <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
          <img src={currentUser?.avatar || "https://picsum.photos/seed/default/100/100"} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold uppercase tracking-tight text-center">
              {error}
            </div>
          )}

          <textarea
            value={content}
            onChange={(e) => { setContent(e.target.value); setError(''); }}
            placeholder="What's on your mind today?"
            className="w-full border-none focus:ring-0 text-[16px] text-black bg-transparent resize-none h-20 placeholder-slate-300 font-bold leading-relaxed"
          ></textarea>

          {imagePreview && (
            <div className="relative mt-4 mb-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
              <img src={imagePreview} alt="Image preview" className="w-full h-32 object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-all"
                title="Remove image"
              >
                <i className="fas fa-times text-xs"></i>
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
                aria-label="Upload image"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 rounded-xl transition-all hover:text-black active:scale-95"
                title="Add image"
              >
                <i className="far fa-image text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 rounded-xl transition-all hover:text-black active:scale-95" title="Add emoji">
                <i className="far fa-face-smile text-lg"></i>
              </button>
            </div>
            
            <button
              onClick={handlePost}
              disabled={(!content.trim() && !selectedImage) || isPosting || !currentUser}
              className="bg-black hover:bg-slate-800 disabled:opacity-30 text-white font-bold py-2.5 px-8 rounded-xl transition-all text-sm shadow-lg shadow-black/10 active:scale-95 flex items-center"
            >
              {isPosting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Post vibe'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
