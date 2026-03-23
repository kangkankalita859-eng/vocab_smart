// Test API call from node.js to simulate frontend
const API_BASE_URL = 'http://localhost:8000';

async function testAPI() {
  try {
    const url = `${API_BASE_URL}/api/vocab?start=0&limit=5`;
    console.log('Testing URL:', url);
    
    const response = await fetch(url);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    console.log('Data length:', data.data?.length || 'No data array');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
