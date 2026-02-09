import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    const result = await authService.login(email);
    if (result.success) {
      setUser(result.user);
      return result.user;
    }
    return null;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const requireAuth = () => {
    if (!user) {
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    showLoginModal,
    setShowLoginModal,
    login,
    logout,
    requireAuth,
    isLoggedIn: !!user
  };
}
