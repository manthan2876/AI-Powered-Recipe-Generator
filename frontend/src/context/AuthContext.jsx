import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, logout as apiLogout } from "../services/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      try {
        const data = await getCurrentUser();
        setUser(data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  const loginUser = (userData) => setUser(userData);

  const logoutUser = async () => {
    try {
      await apiLogout();
    } catch {
      // ignore errors
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
