const API_BASE_URL = 'http://localhost:700/auth';

const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Server responded with:', response.status, response.statusText);
      console.error('Response data:', data);
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export default signup;
