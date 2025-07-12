import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate user data
      setUser({
        id: '1',
        email: 'user@example.com',
        username: 'Usuario Demo',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        createdAt: new Date(),
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    const mockUser: User = {
      id: '1',
      email,
      username: email.split('@')[0],
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('token', 'mock-token');
    return mockUser;
  };

  const register = async (email: string, password: string, username: string) => {
    // Simulate registration
    const mockUser: User = {
      id: '1',
      email,
      username,
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('token', 'mock-token');
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, loading, login, register, logout };
};