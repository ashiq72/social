
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService.ts';
import { User, JwtPayload } from '../types.ts';

interface AuthContextType {
  currentUser: User | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = apiService.getToken();
      if (token) {
        const decoded = apiService.decodeToken(token);
        if (decoded && decoded.userId) {
          try {
            const userData = await apiService.getMe(token);
            if (userData.data) {
              setCurrentUser({
                id: userData.data._id,
                name: userData.data.name,
                username: userData.data.username || userData.data.phone,
                avatar: `https://picsum.photos/seed/${userData.data._id}/100/100`,
                phone: userData.data.phone,
                bio: userData.data.bio || '',
                followersCount: userData.data.followersCount || 0,
                followingCount: userData.data.followingCount || 0,
              });
              setIsAuthenticated(true);
            } else {
              console.error('getMe API did not return user data:', userData);
              apiService.logout();
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
            apiService.logout();
          }
        } else {
          apiService.logout();
        }
      }
    };
    loadUser();
  }, []);

  const login = async (token: string) => {
    apiService.setToken(token);
    const decoded = apiService.decodeToken(token);
    if (decoded && decoded.userId) {
      try {
        const userData = await apiService.getMe(token);
        if (userData.data) {
          setCurrentUser({
            id: userData.data._id,
            name: userData.data.name,
            username: userData.data.username || userData.data.phone,
            avatar: `https://picsum.photos/seed/${userData.data._id}/100/100`,
            phone: userData.data.phone,
            bio: userData.data.bio || '',
            followersCount: userData.data.followersCount || 0,
            followingCount: userData.data.followingCount || 0,
          });
          setIsAuthenticated(true);
        } else {
          console.error('getMe API did not return user data after login:', userData);
          apiService.logout();
        }
      } catch (error) {
        console.error('Error fetching user details after login:', error);
        apiService.logout();
      }
    } else {
      apiService.logout();
    }
  };

  const logout = () => {
    apiService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};