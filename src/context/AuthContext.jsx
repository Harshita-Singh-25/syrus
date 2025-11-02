import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Static demo user - no real authentication
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Static login - always works for demo
    const demoUser = {
      id: 1,
      name: "Demo User",
      email: email,
      role: "user"
    };
    setUser(demoUser);
    console.log('Demo login successful:', demoUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}