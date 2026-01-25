# 🤖 RAG Implementation Setup Guide

## Overview

This portfolio now uses **RAG (Retrieval-Augmented Generation)** for intelligent chat responses:

- **Vector Database**: Pinecone
- **Embeddings Model**: Gemini text-embedding-004 (768 dimensions)
- **LLM**: Gemini 2.0 Flash
- **Retrieval**: Top-5 most relevant documents based on cosine similarity

## How It Works

```
User Question
    ↓
Generate Query Embedding (Gemini text-embedding-004)
    ↓
Search Pinecone Vector DB (Top 5 similar vectors)
    ↓
Retrieve Relevant Context (Projects, Experience, Skills, Personal Info)
    ↓
Send ONLY Relevant Context + Question to Gemini
    ↓
Generate Answer
```

## Setup Instructions

### 1. Get Pinecone API Key

1. Go to [Pinecone](https://www.pinecone.io/)
2. Sign up for free account
3. Create a new project
4. Copy your API key

### 2. Add API Key to Environment

Add to `.env.local`:

```env
PINECONE_API_KEY=your_pinecone_api_key_here
```

### 3. Seed Vector Database

Run the seeding script to upload your portfolio data as vectors:

```bash
node scripts/seed-vectors.js
```

This will:
- Create a Pinecone index named `portfolio-rag`
- Generate embeddings for all your data
- Upload vectors to Pinecone

**What gets embedded:**
- Personal information (name, bio, contact)
- All projects (title, description, tech stack, features)
- Work experience (position, company, achievements)
- Technical skills (frontend, backend, AI/ML, tools)

### 4. Test the Chat

Start your dev server:

```bash
npm run dev
```

Open http://localhost:3000 and test the chat with questions like:
- "What GenAI projects has Praneeth worked on?"
- "Tell me about his experience with React"
- "What are his AI/ML skills?"

## Architecture

### Files Created

```
lib/
├── pinecone-client.js    # Pinecone connection & index management
├── embeddings.js         # Gemini embedding generation
└── rag.js                # RAG retrieval logic

scripts/
└── seed-vectors.js       # Script to seed Pinecone with data

app/api/chat/
└── route.js              # Updated with RAG implementation
```

### Vector Structure

Each vector in Pinecone contains:

```javascript
{
  id: "project-1",              // Unique identifier
  values: [0.123, -0.456, ...], // 768-dimensional embedding
  metadata: {
    type: "project",            // Type: personal, project, experience, skills
    title: "Project Name",      // Searchable metadata
    content: "Full text...",    // Original text content
    data: "{...}"               // Full JSON data
  }
}
```

### Retrieval Process

1. **Query Embedding**: User question → 768-dim vector
2. **Similarity Search**: Find top-5 most similar vectors (cosine similarity)
3. **Context Building**: Extract content from matched vectors
4. **LLM Generation**: Send context + question to Gemini

## Benefits

### ✅ Efficient
- Only sends relevant data to LLM (not entire portfolio)
- Reduces token usage and costs
- Faster response times

### ✅ Accurate
- Semantic search finds relevant info even with different wording
- Answers based on actual portfolio data
- Includes relevance scores

### ✅ Scalable
- Easy to add more data without changing code
- Just re-run seed script after updating JSON files
- Pinecone handles millions of vectors

## Updating Data

When you update your portfolio data:

1. Edit JSON files in `data/` folder
2. Re-run seeding script:
   ```bash
   node scripts/seed-vectors.js
   ```
3. Vectors automatically updated in Pinecone

## Fallback Behavior

If Pinecone is not configured:
- Chat still works with fallback responses
- No RAG, but basic Q&A available
- Graceful degradation

## Monitoring

Check console logs for:
- `🔍 Retrieving relevant context for: [question]`
- `✅ Retrieved X relevant documents`
- Relevance scores for each retrieved document

## Cost Estimate

### Pinecone Free Tier
- 1 index
- 100K vectors
- Enough for portfolio use

### Gemini API
- Embeddings: Free (text-embedding-004)
- Generation: Free tier available
- Very cost-effective

## Troubleshooting

### "PINECONE_API_KEY not configured"
- Add API key to `.env.local`
- Restart dev server

### "Index not found"
- Run `node scripts/seed-vectors.js`
- Wait 10 seconds for index creation

### "No relevant documents found"
- Check if seeding completed successfully
- Verify data exists in JSON files
- Try different question phrasing

## Example Queries

**Good queries** (will find relevant context):
- "What projects use React and AI?"
- "Tell me about his work experience"
- "Does he know Python?"
- "Show me his GenAI projects"

**Poor queries** (may not find context):
- "What's the weather?"
- "Tell me a joke"
- Questions about topics not in portfolio

---

**Your RAG-powered portfolio chat is ready!** 🚀
