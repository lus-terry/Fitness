import React, { createContext, useState, useEffect, useContext } from 'react';
import { login, logout as apiLogout, register, getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const loginUser = async (credentials) => {
    const loggedInUser = await login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const registerUser = async (data) => {
    const newUser = await register(data);
    setUser(newUser);
    return newUser;
  };

  const logoutUser = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, registerUser, logout: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext);
