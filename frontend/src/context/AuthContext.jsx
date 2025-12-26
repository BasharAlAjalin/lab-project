import React, { createContext, useContext, useMemo, useState } from "react";
import {
  clearAuthStorage,
  getToken,
  getUser,
  setToken,
  setUser,
} from "../Utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tokenState, setTokenState] = useState(() => getToken());
  const [userState, setUserState] = useState(() => getUser());

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

  const updateUser = (partial) => {
    const next = { ...(userState || {}), ...(partial || {}) };
    setUser(next);
    setUserState(next);
  };

  const isAuthenticated = !!tokenState;
  const isAdmin = userState?.role === "ADMIN";

  const value = useMemo(
    () => ({
      token: tokenState,
      user: userState,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      updateUser,
    }),
    [tokenState, userState, isAuthenticated, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
