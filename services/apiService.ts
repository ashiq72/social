
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

  setToken(token: string) {
    localStorage.setItem('vibe_token', token);
  },

  getToken() {
    return localStorage.getItem('vibe_token');
  },

  logout() {
    localStorage.removeItem('vibe_token');
    window.location.href = '#/login';
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
