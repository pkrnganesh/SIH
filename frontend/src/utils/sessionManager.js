// Session management utilities
export const SessionManager = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  // Get current user data
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Clear session data
  clearSession: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if token is expired (basic check)
  isTokenExpired: () => {
    const token = localStorage.getItem("token");
    if (!token) return true;

    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error checking token expiry:", error);
      return true;
    }
  },

  // Auto logout if token is expired
  checkAndHandleExpiredToken: (navigate) => {
    if (SessionManager.isAuthenticated() && SessionManager.isTokenExpired()) {
      SessionManager.clearSession();
      if (navigate) {
        navigate('/student-login');
      }
      return true; // Token was expired and cleared
    }
    return false; // Token is valid or user not authenticated
  }
};

export default SessionManager;
