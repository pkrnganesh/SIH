// Mentor-specific session management utilities
export const MentorSessionManager = {
  // Check if mentor is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("mentorToken");
    const mentor = localStorage.getItem("mentor");
    return !!(token && mentor);
  },

  // Get current mentor data
  getCurrentMentor: () => {
    const mentorStr = localStorage.getItem("mentor");
    try {
      return mentorStr ? JSON.parse(mentorStr) : null;
    } catch (error) {
      console.error("Error parsing mentor data:", error);
      return null;
    }
  },

  // Get mentor auth token
  getToken: () => {
    return localStorage.getItem("mentorToken");
  },

  // Clear mentor session data
  clearSession: () => {
    localStorage.removeItem("mentorToken");
    localStorage.removeItem("mentor");
  },

  // Store mentor session data
  setSession: (token, mentorData) => {
    localStorage.setItem("mentorToken", token);
    localStorage.setItem("mentor", JSON.stringify(mentorData));
  },

  // Check if token is expired (basic check)
  isTokenExpired: () => {
    const token = localStorage.getItem("mentorToken");
    if (!token) return true;

    try {
      // Decode JWT token (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error checking mentor token expiry:", error);
      return true;
    }
  },

  // Auto logout if token is expired
  checkAndHandleExpiredToken: (navigate) => {
    if (MentorSessionManager.isAuthenticated() && MentorSessionManager.isTokenExpired()) {
      MentorSessionManager.clearSession();
      if (navigate) {
        navigate('/mentor-login');
      }
      return true; // Token was expired and cleared
    }
    return false; // Token is valid or mentor not authenticated
  },

  // Get mentor role/type
  getMentorRole: () => {
    const mentor = MentorSessionManager.getCurrentMentor();
    return mentor?.userType || 'mentor';
  },

  // Check if mentor is verified
  isMentorVerified: () => {
    const mentor = MentorSessionManager.getCurrentMentor();
    return mentor?.verified || false;
  }
};

export default MentorSessionManager;
