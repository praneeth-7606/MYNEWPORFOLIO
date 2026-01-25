# AI Agent Chatbot - Portfolio Assistant

An intelligent AI-powered chatbot that answers questions about Praneeth's portfolio using LangChain orchestration and multiple data sources.

## 🎯 Features

- **Multi-Source Data Integration**: Pulls from resume, GitHub, portfolio JSON files
- **Intelligent Orchestration**: Uses OpenAI function calling to route queries
- **Real-time Chat Interface**: Beautiful floating chat widget with animations
- **GitHub Integration**: Fetches live repository data
- **Resume Parsing**: Structured resume data extraction
- **Context-Aware Responses**: Understands intent and provides relevant information

## 🏗️ Architecture

```
User Question
    ↓
Chat Widget (React)
    ↓
Next.js API Route (/api/chat)
    ↓
OpenAI Function Calling
    ↓
Tool Selection & Execution
    ├─ Personal Info Tool
    ├─ Projects Tool (filters by category/keyword)
    ├─ Experience Tool
    ├─ Skills Tool
    ├─ Resume Search Tool
    └─ GitHub Tool (repos, profile, search)
    ↓
Response Generation
    ↓
User receives answer
```

## 📦 Tech Stack

- **Frontend**: React, Framer Motion, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI/LLM**: OpenAI GPT-4 with Function Calling
- **Data Sources**: 
  - JSON files (personal, projects, experience, skills)
  - GitHub API
  - Structured resume data
- **Orchestration**: OpenAI function calling (similar to LangChain agents)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Dependencies installed:
- `openai` - OpenAI API client
- `langchain` - LangChain framework
- `@langchain/openai` - OpenAI integration
- `@langchain/community` - Community tools
- `ai` - Vercel AI SDK

### 2. Environment Variables

Create a `.env.local` file:

```env
# Required: OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key

# Optional: GitHub Token (for higher rate limits)
GITHUB_TOKEN=ghp_your-github-token

# Existing variables
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Get OpenAI API Key**: https://platform.openai.com/api-keys

**Get GitHub Token** (optional): https://github.com/settings/tokens

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and click the chat icon in the bottom-right corner!

## 🎨 Chat Widget Features

- **Floating Button**: Click to open/close chat
- **Quick Questions**: Pre-defined questions for easy start
- **Real-time Responses**: Streaming-like experience with loading states
- **Message History**: Maintains conversation context
- **Responsive Design**: Works on all screen sizes
- **Beautiful UI**: Gradient colors matching portfolio theme

## 🔧 Available Tools

The AI agent has access to these tools:

1. **get_personal_info**: Returns personal details, contact info, social links
2. **get_projects**: Filters projects by category or keyword
3. **get_experience**: Returns work experience and internships
4. **get_skills**: Returns technical skills
5. **search_github_projects**: Searches GitHub repositories

## 📝 Example Queries

Try asking:

- "What projects has Praneeth worked on?"
- "Tell me about his GenAI experience"
- "What are his technical skills?"
- "Has he worked with React?"
- "Show me his AI projects"
- "What's his experience with LangChain?"
- "How can I contact him?"
- "What hackathons has he won?"

## 🔌 MCP Integration (Optional Enhancement)

To connect with GitHub via MCP:

### 1. Install MCP GitHub Server

```bash
# Install uv (Python package manager)
# Windows (PowerShell):
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# macOS/Linux:
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Configure MCP

Create `.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["mcp-server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token"
      },
      "disabled": false,
      "autoApprove": ["list_repositories", "get_repository", "search_repositories"]
    }
  }
}
```

### 3. Enhanced GitHub Integration

Once MCP is configured, you can enhance the GitHub tool to use MCP:

```javascript
// In lib/github-tools.js
import { mcpClient } from '@/lib/mcp-client';

export async function fetchGitHubReposViaMCP(username) {
  return await mcpClient.callTool('github', 'list_repositories', {
    owner: username
  });
}
```

## 🎯 Customization

### Add New Data Sources

1. Create a new tool in `app/api/chat/route.js`:

```javascript
{
  type: "function",
  function: {
    name: "get_certifications",
    description: "Get Praneeth's certifications",
    parameters: { type: "object", properties: {} }
  }
}
```

2. Add execution logic:

```javascript
case "get_certifications":
  return certificationsData;
```

### Modify Chat UI

Edit `app/components/chat/ChatWidget.jsx`:
- Change colors in gradient classes
- Adjust size: `w-96 h-[600px]`
- Add new features like file upload, voice input, etc.

### Change AI Model

In `app/api/chat/route.js`:

```javascript
model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo" for faster/cheaper
```

## 📊 Data Flow

1. **User asks question** → Chat Widget
2. **Widget sends to API** → `/api/chat`
3. **API calls OpenAI** with tools and conversation history
4. **OpenAI decides** which tool(s) to use
5. **Tools execute** and return data
6. **OpenAI synthesizes** response from tool results
7. **Response sent back** to user

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add `OPENAI_API_KEY`
3. Add `GITHUB_TOKEN` (optional)
4. Redeploy

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Use environment variables for all API keys
- GitHub token is optional but recommended for higher rate limits
- OpenAI API key is required for chat functionality

## 📈 Future Enhancements

- [ ] Add vector database (Pinecone/Chroma) for semantic search
- [ ] Implement streaming responses for better UX
- [ ] Add file upload for resume parsing
- [ ] Integrate with more data sources (LinkedIn, Medium, etc.)
- [ ] Add conversation memory/history persistence
- [ ] Implement rate limiting
- [ ] Add analytics to track popular questions
- [ ] Multi-language support
- [ ] Voice input/output

## 🐛 Troubleshooting

**Chat not working?**
- Check if `OPENAI_API_KEY` is set in `.env.local`
- Verify API key is valid
- Check browser console for errors

**GitHub data not loading?**
- GitHub API has rate limits (60 requests/hour without token)
- Add `GITHUB_TOKEN` for 5000 requests/hour

**Slow responses?**
- Using GPT-4 (more accurate but slower)
- Switch to GPT-3.5-turbo for faster responses

## 📚 Resources

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [GitHub API](https://docs.github.com/en/rest)

## 🤝 Contributing

Feel free to enhance this AI agent! Some ideas:
- Add more data sources
- Improve tool descriptions
- Enhance UI/UX
- Add new features

---

Built with ❤️ using Next.js, OpenAI, and React
