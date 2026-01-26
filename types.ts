
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
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
