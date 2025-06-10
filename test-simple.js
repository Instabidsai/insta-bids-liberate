// Test the simple test endpoint
async function testAPI() {
  const apiUrl = 'https://www.instabids.ai/api/test';
  
  try {
    console.log('Testing API endpoint:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: 'data'
      })
    });
    
    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response body:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('Parsed response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.log('Could not parse as JSON');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
