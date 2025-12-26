import { createContext, useContext, useMemo, useState } from "react";
import { loginApi } from "../api/auth.api";
import { clearAuth, getToken, getUser, setAuth } from "../Utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const [user, setUserState] = useState(getUser());

  const isAuthed = !!token;

  const login = async ({ email, password }) => {
    const res = await loginApi({ email, password });
    const { token: t, user: u } = res.data;

    setAuth({ token: t, user: u });
    setTokenState(t);
    setUserState(u);

    return res.data;
  };

  const logout = () => {
    clearAuth();
    setTokenState("");
    setUserState(null);
  };

  const value = useMemo(
    () => ({ token, user, isAuthed, login, logout }),
    [token, user, isAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
