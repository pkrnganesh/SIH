class InterviewAPI {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:700';
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Generate questions for a category
  async generateQuestions(category, difficulty = 'medium', count = 5) {
    return this.makeRequest('/interview/generate-questions', {
      method: 'POST',
      body: JSON.stringify({ category, difficulty, count }),
    });
  }

  // Create a new interview session
  async createSession(sessionData) {
    return this.makeRequest('/interview/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  // Start an interview session
  async startSession(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}/start`, {
      method: 'POST',
    });
  }

  // Submit an answer
  async submitAnswer(sessionId, questionId, answer) {
    return this.makeRequest(`/interview/sessions/${sessionId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ questionId, answer }),
    });
  }

  // Complete a session
  async completeSession(sessionId, sessionResults = {}) {
    return this.makeRequest(`/interview/sessions/${sessionId}/complete`, {
      method: 'POST',
      body: JSON.stringify(sessionResults),
    });
  }

  // Get user's interview sessions
  async getUserSessions(userId) {
    // The backend uses the user ID from the token, so we don't need to pass it as a parameter
    return this.makeRequest('/interview/sessions');
  }

  // Get user interview statistics
  async getStats(userId) {
    // The backend uses the user ID from the token, so we don't need to pass it as a parameter
    return this.makeRequest('/interview/statistics');
  }

  // Get session details
  async getSessionDetails(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}`);
  }

  // Get interview categories
  async getCategories() {
    return this.makeRequest('/interview/categories');
  }

  // Get questions for a specific session
  async getSessionQuestions(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}/questions`);
  }

  // Get performance analytics
  async getPerformanceAnalytics(timeframe = '30days') {
    return this.makeRequest(`/interview/analytics?timeframe=${timeframe}`);
  }

  // Update session settings
  async updateSessionSettings(sessionId, settings) {
    return this.makeRequest(`/interview/sessions/${sessionId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Delete a session
  async deleteSession(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  }

  // Get recommended questions based on user performance
  async getRecommendedQuestions(category) {
    return this.makeRequest(`/interview/recommendations/${category}`);
  }

  // Rate a question (feedback)
  async rateQuestion(questionId, rating, feedback = '') {
    return this.makeRequest(`/interview/questions/${questionId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, feedback }),
    });
  }

  // Get interview tips for a category
  async getInterviewTips(category) {
    return this.makeRequest(`/interview/tips/${category}`);
  }

  // Resume a paused session
  async resumeSession(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}/resume`, {
      method: 'POST',
    });
  }

  // Pause a session
  async pauseSession(sessionId) {
    return this.makeRequest(`/interview/sessions/${sessionId}/pause`, {
      method: 'POST',
    });
  }
}

const interviewAPI = new InterviewAPI();
export default interviewAPI;
