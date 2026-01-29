

import { JwtPayload } from '../types.ts';

const BASE_URL = 'https://base360.onrender.com/api/v1';

export const apiService = {
  async register(payload: any) {
    const response = await fetch(`${BASE_URL}/users/create-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  async login(payload: any) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed');
    }
    return data;
  },

  async getMe(token: string) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user details');
    }
    return data;
  },

  async createPost(payload: { title: string; text: string; image?: File; }, token: string) {
    const formData = new FormData();
    // Sending both text and description/title for backward/forward compatibility
    formData.append('title', payload.title);
    formData.append('description', payload.text); 
    formData.append('text', payload.text); // Matches your Mongoose schema
    
    if (payload.image) {
      formData.append('file', payload.image); // 'file' is the field name expected by multer.single("file")
    }

    const response = await fetch(`${BASE_URL}/social/posts/create-post`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create post');
    }
    return data;
  },

  async getAllPosts(token: string) {
    const response = await fetch(`${BASE_URL}/social/posts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch posts');
    }
    return data;
  },

  async getMyPosts(token: string) {
    const response = await fetch(`${BASE_URL}/social/posts/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch your posts');
    }
    return data;
  },

  async deletePost(postId: string, token: string) {
    const response = await fetch(`${BASE_URL}/social/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    // For DELETE, typically a 204 No Content or success status with minimal body
    if (response.status === 204) { // No content
      return { success: true, message: 'Post deleted successfully' };
    }
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete post');
    }
    return { success: true, data: data };
  },

  setToken(token: string) {
    localStorage.setItem('vibe_token', token);
  },

  getToken() {
    return localStorage.getItem('vibe_token');
  },

  logout() {
    localStorage.removeItem('vibe_token');
    window.location.href = '#/login'; // Redirect to login page
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      const decodedPayload = JSON.parse(atob(parts[1]));
      return decodedPayload as JwtPayload;
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  },
};
