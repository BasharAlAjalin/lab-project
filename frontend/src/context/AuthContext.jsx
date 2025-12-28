/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
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
  const [tokenState, setTokenState] = useState(() => getToken());
  const [userState, setUserState] = useState(() => getUser());

  const login = useCallback(({ token, user }) => {
    setToken(token);
    setUser(user);
    setTokenState(token);
    setUserState(user);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setTokenState(null);
    setUserState(null);
  }, []);

  const updateUser = useCallback(
    (partial) => {
      const next = { ...(userState || {}), ...(partial || {}) };
      setUser(next);
      setUserState(next);
    },
    [userState]
  );

  const value = useMemo(() => {
    const isAuthenticated = !!tokenState;
    const isAdmin = userState?.role === "ADMIN";

    return {
      token: tokenState,
      user: userState,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      updateUser,
    };
  }, [tokenState, userState, login, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
