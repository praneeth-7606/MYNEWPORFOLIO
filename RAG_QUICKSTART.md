# 🚀 RAG Quick Start (5 Minutes)

## What You Need

1. **Pinecone API Key** (Free)
2. **Gemini API Key** (Already have it)

## Step-by-Step Setup

### 1. Get Pinecone API Key (2 minutes)

1. Visit: https://www.pinecone.io/
2. Click "Sign Up" (free account)
3. After login, go to "API Keys"
4. Copy your API key

### 2. Add to Environment File (30 seconds)

Open `.env.local` and add:

```env
PINECONE_API_KEY=your_pinecone_api_key_here
```

Your `.env.local` should now have:
```env
GEMINI_API_KEY=AIzaSy...
PINECONE_API_KEY=pcsk_...
```

### 3. Seed Vector Database (2 minutes)

Run this command:

```bash
npm run seed-vectors
```

You'll see:
```
🚀 Starting vector seeding...
📝 Processing personal information...
📦 Processing projects...
💼 Processing experience...
🛠️  Processing skills...
📤 Uploading X vectors to Pinecone...
✅ Vector seeding completed successfully!
```

### 4. Start Dev Server (30 seconds)

```bash
npm run dev
```

### 5. Test the Chat! (1 minute)

Open http://localhost:3000

Click the chat button and ask:
- "What GenAI projects has Praneeth worked on?"
- "Tell me about his React experience"
- "What are his AI/ML skills?"

## How to Verify RAG is Working

Check the terminal logs when you ask a question:

```
🔍 Retrieving relevant context for: What projects has Praneeth worked on?
✅ Retrieved 5 relevant documents
```

If you see these logs, **RAG is working!** 🎉

## What Just Happened?

1. Your portfolio data was converted to **768-dimensional vectors**
2. Vectors were uploaded to **Pinecone** (vector database)
3. When users ask questions:
   - Question → Vector embedding
   - Search Pinecone for similar vectors
   - Retrieve ONLY relevant data
   - Send to Gemini for answer generation

## Benefits

- ✅ **Smarter**: Semantic search finds relevant info
- ✅ **Faster**: Only sends relevant data to AI
- ✅ **Cheaper**: Uses fewer tokens
- ✅ **Scalable**: Add more data anytime

## Updating Your Data

When you edit `data/*.json` files:

```bash
npm run seed-vectors
```

That's it! Vectors automatically updated.

## Troubleshooting

**"PINECONE_API_KEY not configured"**
- Check `.env.local` has the key
- Restart dev server

**"Index not found"**
- Run `npm run seed-vectors`
- Wait 10 seconds, then try again

**Chat works but no RAG logs**
- Pinecone might not be configured
- Check API key is correct
- Verify seeding completed successfully

---

**You now have a production-ready RAG system!** 🚀

For more details, see [RAG_SETUP.md](./RAG_SETUP.md)
