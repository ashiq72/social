

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