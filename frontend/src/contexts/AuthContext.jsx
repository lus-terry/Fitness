import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, logout as apiLogout, register, getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadUser() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

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

const login = async (credentials) => {
  const loggedInUser = await apiLogin(credentials);
  setUser(loggedInUser);
   localStorage.setItem('user', JSON.stringify(loggedInUser));
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
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, registerUser, logout: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => useContext(AuthContext);
