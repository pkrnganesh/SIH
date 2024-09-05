import axios from 'axios';

const API_URL = 'http://localhost:2005';

export const Generateanalysis = async ({ file, percentage, fromDate, toDate }) => {
    try {
        console.log("Data received", file, percentage, fromDate, toDate);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('percentage', percentage);
        formData.append('fromDate', fromDate);
        formData.append('toDate', toDate);

        // Make the POST request to the /basicanalysis endpoint
        const response = await axios.post(`${API_URL}/process/basicanalysis`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        console.error('Error generating analysis:', error);
        throw error;
    }
};
