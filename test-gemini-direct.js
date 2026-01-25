// Test Gemini API directly
const https = require('https');

const apiKey = 'AIzaSyDxgN16fO_eaidTrBOCzUnJJTbWY20P0MA';

if (!apiKey) {
  console.error('No API key found');
  process.exit(1);
}

// Test with gemini-pro model
const data = JSON.stringify({
  contents: [{
    parts: [{
      text: "Say hello"
    }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  port: 443,
  path: `/v1/models?key=${apiKey}`,
  method: 'GET'
};

console.log('Listing available models...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status:', res.statusCode);
    
    if (res.statusCode === 200) {
      const json = JSON.parse(responseData);
      console.log('\n✅ Available models:');
      json.models.forEach(model => {
        if (model.name.includes('gemini') && model.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${model.name}`);
        }
      });
    } else {
      console.log('Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
