// Quick test script to verify chat API is working
const testChat = async () => {
  try {
    console.log('Testing chat API...\n');
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'What projects has Praneeth worked on?' }
        ]
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ SUCCESS! Chat API is working!\n');
      console.log('Response:', data.message);
    } else {
      console.log('❌ ERROR:', data.error);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testChat();
