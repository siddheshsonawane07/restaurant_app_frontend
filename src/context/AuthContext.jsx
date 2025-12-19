import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, loginWithEmail, logout as firebaseLogout } from '../services/firebase';
import { ADMIN_UID } from '../utils/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const user = await loginWithEmail(email, password);
    return user;
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.uid === ADMIN_UID;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};