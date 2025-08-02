import React, { createContext, useContext, useState } from 'react';
import type { AuthFormValues } from '../utils/types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: AuthFormValues | null;
  register: (values: AuthFormValues) => void;
  login: (values: Omit<AuthFormValues, 'firstName' | 'lastName' | 'agreeTerms'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthFormValues | null>(null);
  const navigate = useNavigate();

  const register = (values: AuthFormValues) => {
    // In a real app, you would call your API here
    console.log('Registering user:', values);
    setUser(values);
    localStorage.setItem('user', JSON.stringify(values));
  };

  const login = (values: Omit<AuthFormValues, 'firstName' | 'lastName' | 'agreeTerms'>) => {
    // In a real app, you would verify credentials with your API
    console.log('Logging in user:', values);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};