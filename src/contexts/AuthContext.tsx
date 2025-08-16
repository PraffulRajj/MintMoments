import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface User {
  email: string;
  displayName?: string; // optional
}

interface AuthContextType {
  currentUser: User | null;
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  loginWithGoogle(): void;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use environment variable, fallback to localhost in dev
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signup(email: string, password: string) {
    const res = await axios.post(
      `${API_BASE}/api/auth/signup`,
      { email, password },
      { withCredentials: true }
    );
    setCurrentUser(res.data.user);
  }

  async function login(email: string, password: string) {
    const res = await axios.post(
      `${API_BASE}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    setCurrentUser(res.data.user);
  }

  function loginWithGoogle() {
    window.location.href = `${API_BASE}/api/auth/google`;
  }

  async function logout() {
    await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
