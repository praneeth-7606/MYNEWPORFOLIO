import { NextResponse } from 'next/server';
import { queryAgent } from '@/lib/langchain-agent';

// Check if API keys exist
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

if (!process.env.PINECONE_API_KEY) {
  console.error('PINECONE_API_KEY is not set in environment variables');
}

// Simple fallback for errors
function getSimpleFallback() {
  return `I'm Praneeth's AI assistant! I can help you learn about:

• His projects and technical work
• Skills and expertise
• Work experience and education
• GitHub repositories
• Contact information

What would you like to know?`;
}

export async function POST(req) {
  let messages = [];
  
  try {
    const body = await req.json();
    messages = body.messages || [];

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format', success: false },
        { status: 400 }
      );
    }

    // Get the user's latest question
    const userQuestion = messages[messages.length - 1].content;

    // Convert messages to LangChain format (exclude system messages)
    const chatHistory = messages
      .slice(0, -1)
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'human' : 'ai',
        content: msg.content,
      }));

    console.log('🤖 Processing query with LangChain agent:', userQuestion);
    
    // Use LangChain agent with RAG + GitHub tools
    const result = await queryAgent(userQuestion, chatHistory);
    
    return NextResponse.json({
      message: result.message,
      success: true,
      source: result.source,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response on error
    const fallbackMsg = getSimpleFallback();
    
    return NextResponse.json({
      message: fallbackMsg,
      success: true,
      fallback: true,
      error: error.message,
    });
  }
}
