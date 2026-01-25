# 🤖 AI Agent - Key Files

## 📁 Core Implementation Files

### 1. Frontend (Chat UI)
**File**: `app/components/chat/ChatWidget.jsx`
- Beautiful floating chat interface
- **NEW**: Enlarge/minimize button (top-right of chat header)
- Message history display
- Loading states
- Quick question buttons
- Error handling

**Key Features Added:**
- ✅ Enlarge button (FiMaximize2 icon)
- ✅ Dynamic sizing (normal: 400x600px, enlarged: 600x700px)
- ✅ Better error messages
- ✅ Improved accessibility

### 2. Backend (AI API)
**File**: `app/api/chat/route.js`
- Google Gemini 2.0 Flash integration
- Function calling with 5 tools
- Error handling and validation
- API key checking

**Key Features:**
- ✅ Better error messages
- ✅ API key validation
- ✅ Input validation
- ✅ Helpful error responses

### 3. Data Sources
**Files**:
- `data/personal.json` - Your personal info
- `data/projects.json` - Your projects
- `data/experience.json` - Your work history
- `data/skills.json` - Your technical skills

### 4. Helper Functions
**Files**:
- `lib/github-tools.js` - GitHub API integration
- `lib/agent-tools.js` - Tool orchestration
- `lib/resume-parser.js` - Resume data parsing

### 5. Configuration
**File**: `.env.local` (create this!)
```env
GEMINI_API_KEY=AIzaSy...your-key-here
```

---

## 🎯 How It Works

### Frontend Flow
```
User clicks chat button
    ↓
Chat window opens
    ↓
User types question
    ↓
Sends POST to /api/chat
    ↓
Shows loading animation
    ↓
Displays AI response
```

### Backend Flow
```
Receives POST request
    ↓
Validates API key & input
    ↓
Sends to Gemini with tools
    ↓
Gemini decides which tool to use
    ↓
Executes tool (get_projects, etc.)
    ↓
Gemini synthesizes response
    ↓
Returns to frontend
```

---

## 🔧 New Features Added

### 1. Enlarge Button
**Location**: Top-right of chat header (next to title)
**Icons**: 
- FiMaximize2 (enlarge)
- FiMinimize2 (minimize)

**Sizes**:
- Normal: 400px × 600px
- Enlarged: 600px × 700px

### 2. Better Error Handling
**Frontend**:
- Checks response status
- Shows helpful error messages
- Mentions .env.local if API key missing

**Backend**:
- Validates API key exists
- Validates input format
- Provides specific error messages
- Logs errors to console

---

## 🐛 Fixed Issues

### Error: "Sorry, I encountered an error"
**Cause**: Missing or invalid GEMINI_API_KEY

**Fix**:
1. Create `.env.local` in root folder
2. Add: `GEMINI_API_KEY=AIzaSy...your-key`
3. Get key from: https://aistudio.google.com/app/apikey
4. Restart server: `npm run dev`

### Error: No response from AI
**Cause**: Invalid API response format

**Fix**: Updated code to validate response before displaying

### Error: Function not found
**Cause**: Tool execution errors

**Fix**: Added try-catch in executeFunction with better error handling

---

## 📊 File Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js          ← Backend API (Gemini)
│   ├── components/
│   │   └── chat/
│   │       └── ChatWidget.jsx    ← Frontend UI (with enlarge)
│   └── layout.js                 ← Includes ChatWidget
├── lib/
│   ├── github-tools.js           ← GitHub integration
│   ├── agent-tools.js            ← Tool functions
│   └── resume-parser.js          ← Resume parsing
├── data/
│   ├── personal.json             ← Your info
│   ├── projects.json             ← Your projects
│   ├── experience.json           ← Your experience
│   └── skills.json               ← Your skills
└── .env.local                    ← API key (CREATE THIS!)
```

---

## 🎨 Customization Guide

### Change Chat Size
In `ChatWidget.jsx`, line ~70:
```javascript
const chatSize = isEnlarged 
  ? "w-[600px] h-[700px]"     // Enlarged size
  : "w-96 h-[600px]";         // Normal size
```

### Change Colors
In `ChatWidget.jsx`:
```javascript
// Header gradient
className="bg-gradient-to-r from-pink-500 to-violet-600"

// User message bubble
className="bg-gradient-to-r from-pink-500 to-violet-600"

// Change to your colors:
className="bg-gradient-to-r from-blue-500 to-purple-600"
```

### Change AI Model
In `route.js`, line ~130:
```javascript
model: "gemini-2.0-flash-exp"  // Fastest (current)
model: "gemini-1.5-flash"      // Stable
model: "gemini-1.5-pro"        // More powerful
```

### Add More Quick Questions
In `ChatWidget.jsx`, line ~60:
```javascript
const quickQuestions = [
  "What projects has Praneeth worked on?",
  "Tell me about his GenAI experience",
  "What are his technical skills?",
  "How can I contact him?",
  // Add your own:
  "What's his availability?",
  "Show me his GitHub",
];
```

---

## 🚀 Testing

### Test Locally
```bash
# 1. Make sure .env.local exists with GEMINI_API_KEY
# 2. Start server
npm run dev

# 3. Open browser
http://localhost:3000

# 4. Click chat button (bottom-right)
# 5. Try these queries:
- "What projects has Praneeth worked on?"
- "Tell me about his GenAI experience"
- "What are his technical skills?"
```

### Test Enlarge Button
1. Open chat
2. Look at top-right of header (next to title)
3. Click maximize icon
4. Chat should expand to 600x700px
5. Click minimize icon to shrink back

---

## 🔍 Debugging

### Check Console
Open browser DevTools (F12) and check:
- Network tab: See API requests/responses
- Console tab: See error messages

### Check Server Logs
In terminal where `npm run dev` is running:
- See API errors
- See function execution logs

### Common Issues

**Chat button not visible?**
- Check `app/layout.js` has `<ChatWidget />`
- Clear browser cache
- Check z-index (should be z-50)

**Error messages in chat?**
- Check `.env.local` exists
- Verify GEMINI_API_KEY is correct
- Check API key at: https://aistudio.google.com/app/apikey

**Slow responses?**
- Normal for first request (cold start)
- Should be <1 second after that
- Check network connection

---

## 📚 Documentation

- **[GEMINI_SETUP.md](./GEMINI_SETUP.md)** - Setup guide
- **[START_HERE.md](./START_HERE.md)** - Quick start
- **[QUICKSTART.md](./QUICKSTART.md)** - 3-minute setup
- **[AI_AGENT_README.md](./AI_AGENT_README.md)** - Complete guide

---

## ✅ Checklist

- [ ] Created `.env.local` with GEMINI_API_KEY
- [ ] Got API key from https://aistudio.google.com/app/apikey
- [ ] Ran `npm run dev`
- [ ] See chat button in bottom-right
- [ ] Chat opens when clicked
- [ ] Can send messages
- [ ] AI responds correctly
- [ ] Enlarge button works
- [ ] No errors in console

---

## 🎉 You're All Set!

Your AI agent is ready with:
- ✅ Beautiful chat UI
- ✅ Enlarge/minimize button
- ✅ Better error handling
- ✅ Fast responses (<1s)
- ✅ 5 specialized tools
- ✅ Multi-source data

**Start chatting and impress your visitors!** 🚀
