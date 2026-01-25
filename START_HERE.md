# 🚀 START HERE - AI Agent Setup

## ✅ Implementation Complete!

Your AI-powered portfolio chatbot is ready to use with **Google Gemini 2.0 Flash** - faster and FREE!

---

## 🎯 Quick Setup (3 Minutes)

### 1️⃣ Get Gemini API Key (FREE!)

Visit: https://aistudio.google.com/app/apikey

- Sign in with Google account
- Click "Create API Key"
- Copy the key (starts with `AIza...`)

**Why Gemini?**
- ✅ FREE tier: 1,500 requests/day
- ✅ Fast: <1 second responses
- ✅ No credit card required

### 2️⃣ Create Environment File

Create a file named `.env.local` in the root folder:

```env
GEMINI_API_KEY=AIzaSy...your-key-here
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

### 4️⃣ Test the Chat

1. Open http://localhost:3000
2. Click the chat icon (💬) in bottom-right corner
3. Ask: "What projects has Praneeth worked on?"

---

## 🎉 That's It!

Your AI agent is now live and can answer questions about:
- ✅ Your projects
- ✅ Your experience
- ✅ Your skills
- ✅ Your GitHub repos
- ✅ Contact information

---

## 📚 Documentation

Choose your path:

### 🏃 I want to get started quickly
→ Read **[GEMINI_SETUP.md](./GEMINI_SETUP.md)** (Gemini-specific guide)
→ Read **[QUICKSTART.md](./QUICKSTART.md)** (General quick start)

### 📖 I want complete documentation
→ Read **[AI_AGENT_README.md](./AI_AGENT_README.md)**

### 🏗️ I want to understand the architecture
→ Read **[docs/AI_AGENT_ARCHITECTURE.md](./docs/AI_AGENT_ARCHITECTURE.md)**

### 🎬 I want to demo this to others
→ Read **[docs/DEMO_GUIDE.md](./docs/DEMO_GUIDE.md)**

### 📊 I want implementation details
→ Read **[docs/IMPLEMENTATION_SUMMARY.md](./docs/IMPLEMENTATION_SUMMARY.md)**

### ✅ I want a complete overview
→ Read **[AI_AGENT_COMPLETE.md](./AI_AGENT_COMPLETE.md)**

---

## 🎨 Customize Your Data

Edit these files to personalize the AI agent:

```
data/
├── personal.json     ← Your info, contact, social links
├── projects.json     ← Your projects with details
├── experience.json   ← Your work history
└── skills.json       ← Your technical skills
```

The AI automatically uses your updated data!

---

## 🔧 What Was Built

### Core Files
- `app/api/chat/route.js` - AI agent API endpoint (uses Gemini)
- `app/components/chat/ChatWidget.jsx` - Chat UI
- `lib/github-tools.js` - GitHub integration
- `lib/agent-tools.js` - Tool functions
- `lib/resume-parser.js` - Resume data

### Features
- ✅ Google Gemini 2.0 Flash integration (FREE tier!)
- ✅ Function calling for tool orchestration
- ✅ Multi-source data integration
- ✅ Beautiful chat interface
- ✅ GitHub API integration
- ✅ Fast responses (<1 second)

---

## 💡 Example Queries

Try asking the AI:

**About Projects:**
- "What projects has Praneeth worked on?"
- "Show me his GenAI projects"
- "Has he built any e-commerce sites?"

**About Experience:**
- "Tell me about his work experience"
- "What hackathons has he won?"

**About Skills:**
- "What are his technical skills?"
- "Does he know React?"

**About GitHub:**
- "Show me his GitHub projects"
- "What languages does he use?"

**Contact:**
- "How can I contact him?"

---

## 🐛 Troubleshooting

### Chat not showing?
- Clear browser cache
- Check browser console for errors

### "API key not found"?
- Make sure `.env.local` exists in root folder
- Use `GEMINI_API_KEY` (not OPENAI_API_KEY)
- Restart dev server after creating `.env.local`

### Slow responses?
- Should be <1 second with Gemini 2.0 Flash
- Check network connection
- Verify API key is valid

---

## 🚀 Deploy to Production

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then add `GEMINI_API_KEY` in Vercel dashboard:
1. Project Settings → Environment Variables
2. Add `GEMINI_API_KEY` with your key
3. Redeploy

---

## 📊 File Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   ├── route.js          ← AI agent API
│   │   │   └── test.js           ← Testing script
│   │   └── github/
│   │       └── route.js          ← GitHub API
│   ├── components/
│   │   └── chat/
│   │       └── ChatWidget.jsx    ← Chat UI
│   └── layout.js                 ← Updated with chat
├── lib/
│   ├── agent-tools.js            ← Tool functions
│   ├── github-tools.js           ← GitHub integration
│   └── resume-parser.js          ← Resume data
├── data/
│   ├── personal.json             ← Your info
│   ├── projects.json             ← Your projects
│   ├── experience.json           ← Your experience
│   └── skills.json               ← Your skills
├── docs/
│   ├── AI_AGENT_ARCHITECTURE.md  ← Architecture
│   ├── DEMO_GUIDE.md             ← Demo guide
│   └── IMPLEMENTATION_SUMMARY.md ← Details
├── .env.local                    ← API keys (create this!)
├── AI_AGENT_README.md            ← Full docs
├── QUICKSTART.md                 ← Quick start
├── AI_AGENT_COMPLETE.md          ← Overview
└── START_HERE.md                 ← This file
```

---

## 💰 Cost Estimate

### Google Gemini (FREE Tier!)
- **FREE**: 1,500 requests per day
- **FREE**: 15 requests per minute
- **FREE**: 1 million tokens per month
- Perfect for portfolio sites!

### Paid Tier (If Needed)
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- ~10x cheaper than GPT-4
- 100 queries/day ≈ $0.50/month

---

## 🎯 Next Steps

1. **Test locally** - Try different queries
2. **Customize** - Update your data in `data/` folder
3. **Style** - Change colors to match your brand
4. **Deploy** - Push to Vercel
5. **Share** - Show it off!

---

## 🌟 Key Benefits

### For You
- ✅ Stands out from other portfolios
- ✅ Showcases AI/ML skills
- ✅ Demonstrates full-stack ability
- ✅ Professional impression

### For Visitors
- ✅ Instant answers
- ✅ Interactive experience
- ✅ Easy information discovery
- ✅ Modern and engaging

---

## 📞 Need Help?

1. Check **[QUICKSTART.md](./QUICKSTART.md)** for setup issues
2. Read **[AI_AGENT_README.md](./AI_AGENT_README.md)** for details
3. Review browser console for errors
4. Verify `.env.local` has correct API key

---

## 🎉 You're Ready!

Your AI-powered portfolio assistant is complete and ready to impress!

**Start now:**
```bash
npm run dev
```

**Then visit:** http://localhost:3000

---

**Built with ❤️ using Next.js, OpenAI, and React**

*Questions? Check the documentation!*
