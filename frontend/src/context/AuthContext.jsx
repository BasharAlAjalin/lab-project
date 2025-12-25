// src/Context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearAuthStorage,
  getToken,
  getUser,
  setToken,
  setUser,
} from "../Utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUserState] = useState(() => getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate hydration loading (useful if later you validate token with backend)
    setLoading(false);
  }, []);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    setTokenState(token);
    setUserState(user);
  };

  const logout = () => {
    clearAuthStorage();
    setTokenState(null);
    setUserState(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      setUser: (u) => {
        setUser(u);
        setUserState(u);
      },
    }),
    [token, user, loading, isAuthenticated, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
