

export interface User {
  id: string; // Will map from _id
  name: string;
  username: string; // This could come from the backend's User model directly, or be derived from phone
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  phone: string; // Added phone field
}

export interface Post {
  id: string;
  userId: string;
  user: Partial<User>;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  user: Partial<User>;
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  fromUser: Partial<User>;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  partner: Partial<User>;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  isOnline?: boolean;
}

export interface JwtPayload {
  userId: string;
  name: string;
  phone: string;
  iat: number; // issued at
  exp: number; // expiration
}