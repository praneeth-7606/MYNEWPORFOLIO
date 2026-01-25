// Test file for the AI agent
// Run with: node app/api/chat/test.js

const testQueries = [
  "What projects has Praneeth worked on?",
  "Tell me about his GenAI experience",
  "What are his technical skills?",
  "Has he worked with React?",
  "Show me his AI projects",
  "What's his experience with LangChain?",
  "How can I contact him?",
  "What hackathons has he won?",
  "Tell me about his education",
  "What companies has he worked for?"
];

async function testChatAPI() {
  console.log("🧪 Testing AI Agent Chat API\n");
  
  for (const query of testQueries) {
    console.log(`\n📝 Query: ${query}`);
    console.log("⏳ Processing...");
    
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: query }]
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ Response: ${data.message.substring(0, 200)}...`);
      } else {
        console.log(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("\n✨ Testing complete!");
}

// Run tests
if (require.main === module) {
  testChatAPI();
}

module.exports = { testQueries };
