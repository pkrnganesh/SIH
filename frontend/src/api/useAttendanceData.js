import { useState, useEffect } from 'react';

const useAttendanceData = () => {
  const [data, setData] = useState({
    summaryData: {},
    subjectData: [],
    attendanceData: [],
    holidays: [],
    timetable: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API call or data fetching
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        const mockData = {
          summaryData: {
            'Total Days': 96,
            'Days to Attend': 72,
            'Days Can Skip': 24,
          },
          subjectData: [
            { subject: 'DWDM', 'Total Classes': 29, 'Required for 75%': 22, 'Required for 40%': 12 },
            { subject: 'OOAD', 'Total Classes': 32, 'Required for 75%': 24, 'Required for 40%': 13 },
            { subject: 'DM LAB', 'Total Classes': 32, 'Required for 75%': 24, 'Required for 40%': 13 },
            { subject: 'ADS', 'Total Classes': 30, 'Required for 75%': 23, 'Required for 40%': 12 },
            { subject: 'DM', 'Total Classes': 28, 'Required for 75%': 21, 'Required for 40%': 11 },
            { subject: 'Subject 1', 'Total Classes': 20, 'Required for 75%': 15, 'Required for 40%': 8 },
            { subject: 'Subject 2', 'Total Classes': 25, 'Required for 75%': 19, 'Required for 40%': 10 },
            { subject: 'Subject 3', 'Total Classes': 22, 'Required for 75%': 17, 'Required for 40%': 9 },
            { subject: 'Subject 4', 'Total Classes': 27, 'Required for 75%': 20, 'Required for 40%': 11 },
            { subject: 'Subject 5', 'Total Classes': 24, 'Required for 75%': 18, 'Required for 40%': 10 },
          ],
          attendanceData: [
            { day: '2024-01-01', value: 0 },
            { day: '2024-01-02', value: 1 },
            { day: '2024-01-03', value: 2 },
            { day: '2024-01-04', value: 3 },
            { day: '2024-01-05', value: 2 },
            { day: '2024-01-06', value: 1 },
            { day: '2024-01-07', value: 0 },
            { day: '2024-01-08', value: 1 },
            { day: '2024-01-09', value: 2 },
            { day: '2024-01-10', value: 3 },
            { day: '2024-01-11', value: 2 },
            { day: '2024-01-12', value: 1 },
            { day: '2024-01-13', value: 0 },
            { day: '2024-01-14', value: 1 },
            { day: '2024-01-15', value: 2 },
            { day: '2024-01-16', value: 3 },
            { day: '2024-01-17', value: 2 },
            { day: '2024-01-18', value: 1 },
            { day: '2024-01-19', value: 0 },
            { day: '2024-01-20', value: 1 },
            { day: '2024-01-21', value: 2 },
            { day: '2024-01-22', value: 3 },
            { day: '2024-01-23', value: 2 },
            { day: '2024-01-24', value: 1 },
            { day: '2024-01-25', value: 0 },
            { day: '2024-01-26', value: 1 },
            { day: '2024-01-27', value: 2 },
            { day: '2024-01-28', value: 3 },
            { day: '2024-01-29', value: 2 },
            { day: '2024-01-30', value: 1 },
          ],
          holidays: ['New Year', 'Independence Day', 'Christmas'],
          timetable: {
            Monday: ['DWDM', 'OOAD'],
            Tuesday: ['DM LAB', 'ADS LAB'],
            Wednesday:['OOAD', 'DWDM'],
            Thursday: ['ADS', 'DM'],
            Friday: ['DWDM', 'OOAD'],
            Saturday: ['ADS LAB', 'DM LAB'],
          },
        };

        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, loading };
};

export default useAttendanceData;