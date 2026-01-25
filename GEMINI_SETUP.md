# 🚀 Gemini 2.0 Flash Setup Guide

Your AI agent now uses **Google Gemini 2.0 Flash** - faster, cheaper, and with a generous free tier!

## ✨ Why Gemini 2.0 Flash?

- **FREE Tier**: 15 requests per minute, 1500 per day
- **Fast**: Sub-second response times
- **Powerful**: Function calling support
- **Cost-Effective**: Much cheaper than GPT-4
- **Latest Model**: Gemini 2.0 Flash (experimental)

## 🔑 Get Your Gemini API Key (2 Minutes)

### Step 1: Visit Google AI Studio
Go to: https://aistudio.google.com/app/apikey

### Step 2: Sign In
- Use your Google account
- Accept terms if prompted

### Step 3: Create API Key
1. Click **"Get API Key"** or **"Create API Key"**
2. Select **"Create API key in new project"** (or use existing)
3. Copy the API key (starts with `AIza...`)

### Step 4: Configure Environment
Create `.env.local` in your project root:

```env
GEMINI_API_KEY=AIzaSy...your-key-here
```

That's it! 🎉

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 and click the chat icon!

## 📊 Gemini vs OpenAI Comparison

| Feature | Gemini 2.0 Flash | GPT-4 |
|---------|------------------|-------|
| **Free Tier** | ✅ 1500 requests/day | ❌ No free tier |
| **Speed** | ⚡ <1 second | 🐢 2-5 seconds |
| **Cost (paid)** | 💰 Very cheap | 💰💰💰 Expensive |
| **Function Calling** | ✅ Yes | ✅ Yes |
| **Quality** | 🌟 Excellent | 🌟 Excellent |
| **Rate Limit (free)** | 15 RPM, 1500 RPD | N/A |

## 💰 Pricing

### Free Tier (Generous!)
- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**
- Perfect for portfolio sites!

### Paid Tier (If Needed)
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- ~10x cheaper than GPT-4

## 🎯 What Changed

### Updated Files
1. **`app/api/chat/route.js`** - Now uses Gemini SDK
2. **`.env.example`** - Updated with GEMINI_API_KEY
3. **Documentation** - Updated setup guides

### New Dependencies
- `@google/generative-ai` - Official Gemini SDK

### API Differences
- **Model**: `gemini-2.0-flash-exp` (latest experimental)
- **Function Calling**: Native Gemini format
- **Conversation**: Uses chat history format
- **System Instructions**: Built-in support

## 🔧 Configuration

### Model Options

In `app/api/chat/route.js`, you can change the model:

```javascript
// Current: Latest experimental
model: "gemini-2.0-flash-exp"

// Stable version
model: "gemini-1.5-flash"

// More powerful (but slower/expensive)
model: "gemini-1.5-pro"
```

### Rate Limiting

Free tier limits:
- 15 requests per minute
- 1,500 requests per day

For higher limits, upgrade to paid tier.

## 🎨 Features Supported

✅ **Function Calling** - All 5 tools work perfectly
✅ **Conversation History** - Maintains context
✅ **System Instructions** - Custom persona
✅ **Streaming** - Can be added easily
✅ **Multi-turn Chat** - Follow-up questions work

## 🚀 Performance

### Response Times
- **Gemini 2.0 Flash**: 0.5-2 seconds ⚡
- **GPT-4**: 2-5 seconds 🐢

### Quality
- Excellent for portfolio Q&A
- Natural conversation flow
- Accurate information retrieval
- Context-aware responses

## 🐛 Troubleshooting

### "API key not found"
- Create `.env.local` in root folder
- Add `GEMINI_API_KEY=your-key`
- Restart dev server

### "Rate limit exceeded"
- Free tier: 15 requests/minute
- Wait a minute or upgrade to paid
- Implement caching for common queries

### "Model not found"
- Check model name spelling
- Use `gemini-2.0-flash-exp` or `gemini-1.5-flash`
- Ensure API key is valid

### Slow responses
- Should be <2 seconds
- Check network connection
- Try `gemini-1.5-flash` for faster responses

## 📚 Documentation

### Official Docs
- **Gemini API**: https://ai.google.dev/docs
- **Function Calling**: https://ai.google.dev/docs/function_calling
- **Pricing**: https://ai.google.dev/pricing

### Your Docs
- **[START_HERE.md](./START_HERE.md)** - Quick start
- **[AI_AGENT_README.md](./AI_AGENT_README.md)** - Complete guide
- **[QUICKSTART.md](./QUICKSTART.md)** - 5-minute setup

## 🎯 Example Usage

### Test the API

```javascript
// In browser console or test file
fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What projects has Praneeth worked on?' }
    ]
  })
})
.then(r => r.json())
.then(console.log);
```

### Expected Response
```json
{
  "message": "Praneeth has worked on several impressive projects...",
  "success": true
}
```

## 🔮 Advanced Features

### Enable Streaming (Optional)

For real-time responses:

```javascript
// In route.js
const result = await chat.sendMessageStream(userMessage);

for await (const chunk of result.stream) {
  const text = chunk.text();
  // Send chunk to client
}
```

### Add Safety Settings

```javascript
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  tools: [{ functionDeclarations: tools }],
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});
```

### Adjust Temperature

```javascript
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  tools: [{ functionDeclarations: tools }],
  generationConfig: {
    temperature: 0.7, // 0-1, higher = more creative
    topP: 0.8,
    topK: 40,
  },
});
```

## 💡 Tips

1. **Free Tier is Generous**: 1500 requests/day is plenty for a portfolio
2. **Fast Responses**: Gemini 2.0 Flash is much faster than GPT-4
3. **Function Calling Works Great**: All tools work perfectly
4. **Monitor Usage**: Check Google AI Studio for usage stats
5. **Upgrade if Needed**: Paid tier is very affordable

## 🎉 Benefits

### For Development
- ✅ Free tier for testing
- ✅ Fast iteration
- ✅ No credit card required
- ✅ Generous rate limits

### For Production
- ✅ Fast responses (<2s)
- ✅ Low cost
- ✅ High quality
- ✅ Reliable uptime

### For Users
- ✅ Instant answers
- ✅ Smooth experience
- ✅ Accurate information
- ✅ Natural conversation

## 🚀 Deploy to Production

### Vercel Deployment

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key
4. Deploy!

### Environment Variables

In Vercel dashboard:
```
GEMINI_API_KEY=AIzaSy...your-key
GITHUB_TOKEN=ghp_...your-token (optional)
```

## 📊 Monitoring

### Check Usage
Visit: https://aistudio.google.com/app/apikey

- View request count
- Monitor rate limits
- Check quota usage

### Upgrade if Needed
If you exceed free tier:
1. Go to Google Cloud Console
2. Enable billing
3. Automatic upgrade to paid tier

## ✅ Migration Complete!

Your AI agent now uses Gemini 2.0 Flash:
- ✅ Faster responses
- ✅ Free tier available
- ✅ Lower costs
- ✅ Same great features

**Get your API key and start chatting!**

---

**Questions?** Check [AI_AGENT_README.md](./AI_AGENT_README.md) or [START_HERE.md](./START_HERE.md)
