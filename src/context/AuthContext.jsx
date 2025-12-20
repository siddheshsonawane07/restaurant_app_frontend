import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, loginWithEmail, logout as firebaseLogout } from '../services/firebase';

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
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setAdmin(false);
        setLoading(false);
        return;
      }

      // 🔥 IMPORTANT: read custom claims
      const tokenResult = await firebaseUser.getIdTokenResult(true);

      const isAdmin =
        tokenResult.claims.admin === true ||
        tokenResult.claims.role === 'admin';

      setUser(firebaseUser);
      setAdmin(isAdmin);
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
    setAdmin(false);
  };

  /**
   * SAME FUNCTION SIGNATURE AS BEFORE
   * but now checks Firebase custom claims
   */
  const isAdmin = () => {
    return admin === true;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin, // ✅ unchanged usage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
