# AI Agent Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Chat Widget (React)                    │  │
│  │  - Floating button                                        │  │
│  │  - Message history                                        │  │
│  │  - Input field                                            │  │
│  │  - Quick questions                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTP POST
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js)                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              /api/chat Route Handler                      │  │
│  │  - Receives user message                                  │  │
│  │  - Manages conversation context                           │  │
│  │  - Calls OpenAI API                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    AI ORCHESTRATION LAYER                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  OpenAI GPT-4 with                        │  │
│  │                  Function Calling                         │  │
│  │                                                           │  │
│  │  System Prompt:                                           │  │
│  │  "You are an AI assistant for Praneeth's portfolio..."   │  │
│  │                                                           │  │
│  │  Available Tools:                                         │  │
│  │  ├─ get_personal_info()                                   │  │
│  │  ├─ get_projects(category, keyword)                       │  │
│  │  ├─ get_experience()                                      │  │
│  │  ├─ get_skills()                                          │  │
│  │  └─ search_github_projects(query)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        TOOL EXECUTION                           │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Personal   │  │   Projects   │  │  Experience  │         │
│  │     Info     │  │    Filter    │  │    Query     │         │
│  │              │  │              │  │              │         │
│  │  Returns:    │  │  Returns:    │  │  Returns:    │         │
│  │  - Name      │  │  - Filtered  │  │  - Work      │         │
│  │  - Email     │  │    projects  │  │    history   │         │
│  │  - Bio       │  │  - Tech      │  │  - Internsh. │         │
│  │  - Links     │  │    stack     │  │  - Achievem. │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │    Skills    │  │    GitHub    │                            │
│  │    Query     │  │  Integration │                            │
│  │              │  │              │                            │
│  │  Returns:    │  │  Returns:    │                            │
│  │  - Languages │  │  - Repos     │                            │
│  │  - Frontend  │  │  - Stars     │                            │
│  │  - Backend   │  │  - Languages │                            │
│  │  - AI/ML     │  │  - Topics    │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ personal.json│  │projects.json │  │experience.json│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  skills.json │  │  GitHub API  │  │Resume Parser │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow Example

### User Query: "What GenAI projects has Praneeth worked on?"

```
1. User Input
   └─> "What GenAI projects has Praneeth worked on?"

2. Chat Widget
   └─> POST /api/chat
       Body: { messages: [{ role: "user", content: "..." }] }

3. API Route Handler
   └─> Calls OpenAI API with:
       - System prompt (defines agent persona)
       - User message
       - Available tools (function definitions)

4. OpenAI Decision
   └─> Analyzes query
   └─> Decides to call: get_projects({ category: "genai" })

5. Tool Execution
   └─> executeFunction("get_projects", { category: "genai" })
   └─> Filters projects.json for category="genai"
   └─> Returns:
       [
         {
           title: "AI-Powered Medical Chatbot",
           description: "...",
           techStack: ["Mistral AI", "LangChain", "RAG", ...]
         },
         {
           title: "Resume Automation System",
           description: "...",
           techStack: ["Mistral AI", "FastAPI", ...]
         }
       ]

6. OpenAI Synthesis
   └─> Receives tool results
   └─> Generates natural language response:
       "Praneeth has worked on two impressive GenAI projects:
        
        1. AI-Powered Medical Chatbot - An intelligent chatbot
           that provides medication recommendations using Mistral AI,
           LangChain, and RAG architecture. It achieved 94% accuracy
           with sub-2-second response times.
        
        2. Resume Automation System - An AI-powered tool for
           generating resumes and cover letters. This project won
           1st prize in an internal hackathon and has a 90% user
           satisfaction rate.
        
        Both projects showcase his expertise in LLM integration,
        RAG implementation, and building production-ready AI
        applications."

7. Response to User
   └─> Chat Widget displays formatted response
   └─> User can ask follow-up questions
```

## Tool Definitions

### 1. get_personal_info

**Purpose**: Retrieve personal details, contact info, social links

**Parameters**: None

**Returns**:
```json
{
  "name": "Praneeth Vedagiri",
  "title": "Full-Stack Developer & GenAI Specialist",
  "email": "praneethvvsss@gmail.com",
  "phone": "+916303087606",
  "socialLinks": { ... },
  "resume": { ... }
}
```

### 2. get_projects

**Purpose**: Filter and search projects

**Parameters**:
- `category` (optional): "genai", "fullstack", "ecommerce", "api"
- `keyword` (optional): Search term for title/description

**Returns**: Array of matching projects

### 3. get_experience

**Purpose**: Retrieve work history

**Parameters**: None

**Returns**: Array of experience entries with achievements

### 4. get_skills

**Purpose**: Get technical skills

**Parameters**: None

**Returns**: Skills data from skills.json

### 5. search_github_projects

**Purpose**: Search GitHub repositories

**Parameters**:
- `query` (required): Search term

**Returns**: Matching repositories with metadata

## Data Flow Patterns

### Pattern 1: Simple Query (No Tools)

```
User: "Hi, who are you?"
  ↓
OpenAI: (No tools needed)
  ↓
Response: "I'm an AI assistant for Praneeth Vedagiri's portfolio..."
```

### Pattern 2: Single Tool Call

```
User: "What's his email?"
  ↓
OpenAI: Call get_personal_info()
  ↓
Tool: Returns personal data
  ↓
OpenAI: Synthesizes response
  ↓
Response: "You can reach Praneeth at praneethvvsss@gmail.com"
```

### Pattern 3: Multiple Tool Calls

```
User: "Tell me about his React experience"
  ↓
OpenAI: Calls multiple tools:
  ├─> get_projects({ keyword: "react" })
  ├─> get_experience()
  └─> get_skills()
  ↓
Tools: Return relevant data
  ↓
OpenAI: Combines all results
  ↓
Response: "Praneeth has extensive React experience including..."
```

### Pattern 4: Iterative Refinement

```
User: "Show me AI projects"
  ↓
OpenAI: get_projects({ category: "genai" })
  ↓
User: "Tell me more about the medical chatbot"
  ↓
OpenAI: (Uses context from previous response)
  ↓
Response: "The AI-Powered Medical Chatbot uses..."
```

## Technology Stack

### Frontend
- **React**: UI components
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling

### Backend
- **Next.js API Routes**: Serverless functions
- **OpenAI API**: LLM and function calling

### Data Layer
- **JSON Files**: Structured portfolio data
- **GitHub API**: Live repository data
- **Resume Parser**: Structured resume extraction

### AI/ML
- **GPT-4**: Language model
- **Function Calling**: Tool orchestration
- **Context Management**: Conversation history

## Scalability Considerations

### Current Implementation
- Stateless API (no session storage)
- In-memory conversation context
- Direct JSON file reads

### Future Enhancements
- **Vector Database**: Semantic search with embeddings
- **Caching**: Redis for frequently accessed data
- **Rate Limiting**: Prevent API abuse
- **Session Storage**: Persist conversations
- **Streaming**: Real-time response generation
- **Analytics**: Track popular queries

## Security

### Current Measures
- Environment variables for API keys
- No sensitive data in client code
- CORS configuration
- Input validation

### Recommended Additions
- Rate limiting per IP
- API key rotation
- Request logging
- User authentication (optional)
- Content filtering

## Performance

### Optimization Strategies
1. **Caching**: Cache GitHub API responses
2. **Lazy Loading**: Load chat widget on demand
3. **Debouncing**: Prevent rapid-fire requests
4. **Compression**: Minimize response sizes
5. **CDN**: Serve static assets

### Current Metrics
- **API Response Time**: 2-5 seconds (GPT-4)
- **Tool Execution**: <100ms
- **GitHub API**: 200-500ms
- **Total Latency**: 2-6 seconds

### Improvement Options
- Switch to GPT-3.5-turbo: 1-2 seconds
- Implement streaming: Perceived instant response
- Add caching: Sub-second for repeated queries

---

This architecture provides a solid foundation for an intelligent portfolio assistant that can be easily extended with additional data sources and capabilities.
