# 🚀 Quick Start Guide - AI Agent Chatbot

Get your AI-powered portfolio assistant running in 3 minutes with **Google Gemini 2.0 Flash**!

## Step 1: Get Gemini API Key (1 minute) - FREE!

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy the key (starts with `AIza...`)

**Why Gemini?**
- ✅ **FREE**: 1,500 requests per day
- ✅ **Fast**: <1 second responses
- ✅ **No Credit Card**: Required
- ✅ **Generous**: Perfect for portfolios

## Step 2: Configure Environment (30 seconds)

Create `.env.local` file in the root directory:

```env
GEMINI_API_KEY=AIzaSy...your-key-here
```

That's it! GitHub integration works without a token (60 requests/hour).

## Step 3: Run the App (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000

## Step 4: Test the Chat (30 seconds)

1. Look for the chat icon (💬) in the bottom-right corner
2. Click it to open the chat
3. Try asking: "What projects has Praneeth worked on?"

## ✅ You're Done!

The AI agent is now running and can answer questions about:
- Personal information and contact details
- Projects (with filtering by category/technology)
- Work experience and internships
- Technical skills
- GitHub repositories

## 🎨 Customization

### Change Your Information

Edit these files in the `data/` folder:
- `personal.json` - Your details
- `projects.json` - Your projects
- `experience.json` - Your work history
- `skills.json` - Your skills

The AI will automatically use your updated data!

### Customize Chat Appearance

Edit `app/components/chat/ChatWidget.jsx`:

```javascript
// Change colors
className="bg-gradient-to-r from-pink-500 to-violet-600"
// Change to your colors:
className="bg-gradient-to-r from-blue-500 to-purple-600"

// Change size
className="w-96 h-[600px]"
// Make it bigger:
className="w-[500px] h-[700px]"
```

### Add Quick Questions

In `ChatWidget.jsx`, modify:

```javascript
const quickQuestions = [
  "Your custom question 1?",
  "Your custom question 2?",
  "Your custom question 3?",
];
```

## 🔧 Optional: GitHub Token (Higher Rate Limits)

Without token: 60 requests/hour
With token: 5000 requests/hour

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy the token
5. Add to `.env.local`:

```env
GITHUB_TOKEN=ghp_your-token-here
```

## 🐛 Troubleshooting

**Chat button not showing?**
- Clear browser cache
- Check browser console for errors

**"API key not found" error?**
- Make sure `.env.local` exists in root folder
- Use `GEMINI_API_KEY` (not OPENAI_API_KEY)
- Restart the dev server after creating `.env.local`

**Slow responses?**
- Should be <1 second with Gemini 2.0 Flash
- Check network connection
- Verify API key is valid

**"Rate limit exceeded"?**
- Free tier: 15 requests/minute, 1500/day
- Wait a minute or upgrade to paid tier
- Implement caching for common queries

**GitHub data not loading?**
- Check if username is correct in `lib/github-tools.js`
- Add GitHub token for higher rate limits

## 📚 Next Steps

- Read [AI_AGENT_README.md](./AI_AGENT_README.md) for detailed documentation
- Customize the chat UI to match your brand
- Add more data sources (LinkedIn, Medium, etc.)
- Deploy to Vercel (see main README)

## 💡 Tips

1. **Free Tier is Generous**: 1500 requests/day is plenty for a portfolio
2. **Fast Responses**: Gemini 2.0 Flash responds in <1 second
3. **No Credit Card**: Start using immediately
4. **Monitor Usage**: Check Google AI Studio for usage stats
5. **Upgrade if Needed**: Paid tier is very affordable (~$0.50/month)

## 🎉 Success!

Your AI agent is ready to impress visitors with intelligent, context-aware responses about your portfolio!

---

Need help? Check the [full documentation](./AI_AGENT_README.md) or open an issue.
