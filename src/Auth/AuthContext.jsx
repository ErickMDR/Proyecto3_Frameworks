/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('portfolio_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem('portfolio_users');
    
    if (!savedUsers) {
      const defaultUsers = [
        { username: 'admin', password: 'admin' },
        { username: 'erick', password: '1234' }
      ];
      localStorage.setItem('portfolio_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('portfolio_users')) || [];
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userData = { username, isAuthenticated: true };
      setUser(userData);
      localStorage.setItem('portfolio_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('portfolio_users')) || [];
    
    if (users.some(u => u.username === username)) {
      return false;
    }
    
    users.push({ username, password });
    localStorage.setItem('portfolio_users', JSON.stringify(users));
    
    const userData = { username, isAuthenticated: true };
    setUser(userData);
    localStorage.setItem('portfolio_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portfolio_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};