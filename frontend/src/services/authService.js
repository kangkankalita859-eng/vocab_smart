const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export const authService = {
  // Login with email
  async login(email) {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // Get user progress
  async getUserProgress(userId) {
    try {
      const response = await fetch(`${API_BASE}/auth/progress/${userId}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        return { success: true, progress: data.progress };
      } else {
        return { success: false, error: data.message || 'Failed to get progress' };
      }
    } catch (error) {
      console.error('Get progress error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  },

  // Update user progress
  async updateUserProgress(userId, progressData) {
    try {
      const response = await fetch(`${API_BASE}/auth/progress/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Failed to update progress' };
      }
    } catch (error) {
      console.error('Update progress error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }
};
