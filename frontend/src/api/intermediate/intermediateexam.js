import axios from 'axios';

const BASE_URL = 'http://localhost:700'; // Backend API URL

// Function to fetch all exams
export const getExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/intermediateexams/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exams: ", error);
    throw error;
  }
};
