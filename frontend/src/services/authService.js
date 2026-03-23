// Auth service - local storage instead of backend API
const USERS_KEY = 'vocab_users';
const PROGRESS_KEY = 'vocab_progress';

const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
  } catch (error) {
    console.error('Error loading users:', error);
    return {};
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const getProgress = () => {
  try {
    const progress = localStorage.getItem(PROGRESS_KEY);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
};

const saveProgress = (progress) => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const authService = {
  // Login or create user
  async login(email) {
    try {
      const users = getUsers();
      
      if (email in users) {
        // Update last login for existing user
        users[email].last_login = new Date().toISOString();
        saveUsers(users);
        
        return {
          status: "success",
          message: "User logged in successfully",
          user: users[email]
        };
      } else {
        // Create new user
        const newUser = {
          id: Object.keys(users).length + 1,
          email: email,
          name: email.split("@")[0], // Use email prefix as name
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString()
        };
        
        users[email] = newUser;
        saveUsers(users);
        
        // Initialize progress for new user
        const progress = getProgress();
        progress[newUser.id] = {
          user_id: newUser.id,
          vocab_known: [],
          vocab_unknown: [],
          idioms_known: [],
          idioms_unknown: [],
          updated_at: new Date().toISOString()
        };
        saveProgress(progress);
        
        return {
          status: "success",
          message: "User created and logged in successfully",
          user: newUser
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Login failed: ${error.message}`
      };
    }
  },

  // Get user by ID
  async getUser(userId) {
    try {
      const users = getUsers();
      const user = Object.values(users).find(u => u.id === userId);
      
      if (user) {
        return {
          status: "success",
          user: user
        };
      } else {
        return {
          status: "error",
          message: "User not found"
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Failed to get user: ${error.message}`
      };
    }
  },

  // Get user progress
  async getUserProgress(userId) {
    try {
      const progress = getProgress();
      const userProgress = progress[userId];
      
      if (!userProgress) {
        return {
          status: "success",
          progress: {
            user_id: userId,
            vocab_known: [],
            vocab_unknown: [],
            idioms_known: [],
            idioms_unknown: [],
            updated_at: new Date().toISOString()
          }
        };
      }
      
      return {
        status: "success",
        progress: userProgress
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to get progress: ${error.message}`
      };
    }
  },

  // Update user progress
  async updateUserProgress(userId, progressData) {
    try {
      const progress = getProgress();
      
      progress[userId] = {
        user_id: userId,
        vocab_known: progressData.vocab_known || [],
        vocab_unknown: progressData.vocab_unknown || [],
        idioms_known: progressData.idioms_known || [],
        idioms_unknown: progressData.idioms_unknown || [],
        updated_at: new Date().toISOString()
      };
      
      saveProgress(progress);
      
      return {
        status: "success",
        message: "Progress updated successfully"
      };
    } catch (error) {
      return {
        status: "error",
        message: `Failed to update progress: ${error.message}`
      };
    }
  }
};
