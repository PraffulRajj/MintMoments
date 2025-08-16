import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  email: string;
  displayName?: string;
}

interface AuthContextType {
  currentUser: User | null;
  signup(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  loginWithGoogle(): void;
  logout(): Promise<void>;
  refreshUser(): Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Netlify -> set VITE_API_URL = https://mintmoments.onrender.com
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
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

  async function refreshUser() {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/me`, {
        withCredentials: true,
      });
      setCurrentUser(res.data.user);
    } catch {
      setCurrentUser(null);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signup, login, loginWithGoogle, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
