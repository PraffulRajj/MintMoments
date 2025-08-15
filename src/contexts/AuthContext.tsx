import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  currentUser: { email: string } | null;
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  loginWithGoogle(): void;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);

  async function signup(email: string, password: string) {
    const res = await axios.post('http://localhost:3001/api/auth/signup', { email, password }, { withCredentials: true });
    setCurrentUser(res.data.user);
  }

  async function login(email: string, password: string) {
    const res = await axios.post('http://localhost:3001/api/auth/login', { email, password }, { withCredentials: true });
    setCurrentUser(res.data.user);
  }

  function loginWithGoogle() {
    window.location.href = 'http://localhost:3001/api/auth/google';
  }

  async function logout() {
    await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
