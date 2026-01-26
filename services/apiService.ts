
import { Post, User, Notification } from '../types';

// INSTRUCTIONS: Update the BASE_URL to point to your Express.js backend.
const BASE_URL = 'http://localhost:5000/api';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  username: 'arivera_vibes',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  bio: 'Digital nomad & Frontend enthusiast. Exploring the world one line of code at a time. 🚀',
  followersCount: 1240,
  followingCount: 850
};

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: MOCK_USER,
    content: "Just finished setting up the new office space! The lighting is everything. What's your favorite workspace vibe? ✨ #productivity #setup",
    image: 'https://picsum.photos/seed/office/800/600',
    likes: 42,
    comments: 5,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isLiked: false
  },
  {
    id: 'p2',
    userId: 'u2',
    user: {
      name: 'Sarah Chen',
      username: 'schen_dev',
      avatar: 'https://picsum.photos/seed/sarah/200/200'
    },
    content: "React 19 is looking incredible. The new actions API is going to simplify so many patterns! ⚛️",
    likes: 128,
    comments: 24,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isLiked: true
  }
];

export const fetchPosts = async (): Promise<Post[]> => {
  // In production: return fetch(`${BASE_URL}/posts`).then(r => r.json());
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_POSTS), 800));
};

export const fetchCurrentUser = async (): Promise<User> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_USER), 500));
};

export const createPost = async (content: string, image?: string): Promise<Post> => {
  const newPost: Post = {
    id: `p${Math.random().toString(36).substr(2, 9)}`,
    userId: MOCK_USER.id,
    user: MOCK_USER,
    content,
    image,
    likes: 0,
    comments: 0,
    timestamp: new Date().toISOString()
  };
  return new Promise((resolve) => setTimeout(() => resolve(newPost), 1000));
};

export const toggleLike = async (postId: string): Promise<boolean> => {
  return true; // Simulate success
};
