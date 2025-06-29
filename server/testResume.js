const axios = require('axios');

// Test configuration
const API_BASE_URL = 'http://localhost:5000';
const TEST_USER_ID = 'test_user_123'; // Replace with actual user ID

// Test data
const testResumeData = {
  title: 'Test Resume',
  template: 'modern',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    city: 'San Francisco',
    state: 'CA',
    linkedin: 'https://linkedin.com/in/johndoe'
  },
  summary: 'Experienced software developer with expertise in full-stack development.',
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Developer',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2023-12-31'),
      current: false,
      description: 'Led development of web applications using React and Node.js',
      location: 'San Francisco, CA'
    }
  ],
  education: [
    {
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: new Date('2016-09-01'),
      endDate: new Date('2020-05-30'),
      current: false,
      gpa: '3.8'
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      skills: ['JavaScript', 'Python', 'Java']
    },
    {
      category: 'Frameworks',
      skills: ['React', 'Node.js', 'Express']
    }
  ]
};

// Helper function to make requests
const makeRequest = async (method, endpoint, data = null, headers = {}) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'userid': TEST_USER_ID,
        ...headers
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
};

// Test functions
const testGetTemplates = async () => {
  console.log('\n--- Testing Get Templates ---');
  try {
    const result = await makeRequest('GET', '/api/resume/templates');
    console.log('✅ Templates retrieved successfully:', result.templates?.length || 0, 'templates');
    return result;
  } catch (error) {
    console.log('❌ Get templates failed');
  }
};

const testCreateResume = async () => {
  console.log('\n--- Testing Create Resume ---');
  try {
    const result = await makeRequest('POST', '/api/resume', testResumeData);
    console.log('✅ Resume created successfully, ID:', result.resume._id);
    return result.resume;
  } catch (error) {
    console.log('❌ Create resume failed');
  }
};

const testGetUserResumes = async () => {
  console.log('\n--- Testing Get User Resumes ---');
  try {
    const result = await makeRequest('GET', '/api/resume/user');
    console.log('✅ User resumes retrieved:', result.resumes?.length || 0, 'resumes');
    return result;
  } catch (error) {
    console.log('❌ Get user resumes failed');
  }
};

const testGetResume = async (resumeId) => {
  console.log('\n--- Testing Get Specific Resume ---');
  try {
    const result = await makeRequest('GET', `/api/resume/${resumeId}`);
    console.log('✅ Resume retrieved successfully:', result.resume.title);
    return result;
  } catch (error) {
    console.log('❌ Get resume failed');
  }
};

const testUpdateResume = async (resumeId) => {
  console.log('\n--- Testing Update Resume ---');
  try {
    const updateData = {
      title: 'Updated Test Resume',
      summary: 'Updated summary for the resume'
    };
    const result = await makeRequest('PUT', `/api/resume/${resumeId}`, updateData);
    console.log('✅ Resume updated successfully, version:', result.resume.version);
    return result;
  } catch (error) {
    console.log('❌ Update resume failed');
  }
};

const testDuplicateResume = async (resumeId) => {
  console.log('\n--- Testing Duplicate Resume ---');
  try {
    const result = await makeRequest('POST', `/api/resume/${resumeId}/duplicate`);
    console.log('✅ Resume duplicated successfully, new ID:', result.resume._id);
    return result;
  } catch (error) {
    console.log('❌ Duplicate resume failed');
  }
};

const testDownloadResume = async (resumeId) => {
  console.log('\n--- Testing Download Resume ---');
  try {
    const result = await makeRequest('GET', `/api/resume/${resumeId}/download?format=json`);
    console.log('✅ Resume download data retrieved successfully');
    return result;
  } catch (error) {
    console.log('❌ Download resume failed');
  }
};

const testDeleteResume = async (resumeId) => {
  console.log('\n--- Testing Delete Resume ---');
  try {
    const result = await makeRequest('DELETE', `/api/resume/${resumeId}`);
    console.log('✅ Resume deleted successfully');
    return result;
  } catch (error) {
    console.log('❌ Delete resume failed');
  }
};

// Run all tests
const runTests = async () => {
  console.log('🧪 Starting Resume API Tests...');
  console.log('📋 API Base URL:', API_BASE_URL);
  console.log('👤 Test User ID:', TEST_USER_ID);

  try {
    // Test basic functionality
    await testGetTemplates();
    
    // Test resume CRUD operations
    const createdResume = await testCreateResume();
    if (!createdResume) return;

    await testGetUserResumes();
    await testGetResume(createdResume._id);
    await testUpdateResume(createdResume._id);
    
    // Test additional features
    const duplicatedResume = await testDuplicateResume(createdResume._id);
    await testDownloadResume(createdResume._id);
    
    // Cleanup - delete test resumes
    await testDeleteResume(createdResume._id);
    if (duplicatedResume) {
      await testDeleteResume(duplicatedResume.resume._id);
    }

    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.log('\n❌ Test suite failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
  testGetTemplates,
  testCreateResume,
  testGetUserResumes,
  testGetResume,
  testUpdateResume,
  testDuplicateResume,
  testDownloadResume,
  testDeleteResume
};
