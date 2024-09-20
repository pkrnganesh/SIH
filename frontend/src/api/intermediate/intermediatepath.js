import axios from 'axios';

const BASE_URL = 'http://localhost:700'; // Backend API URL

// Function to fetch all exams
export const getCareerPaths = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/intermediate/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching get CareerPaths: ", error);
    throw error;
  }
};
