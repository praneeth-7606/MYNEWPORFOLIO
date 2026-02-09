import { NextResponse } from 'next/server';
import { queryAgentWithMCP } from '@/lib/langchain-agent-mcp';

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
  console.log('\n🌐 ========== CHAT API REQUEST ==========');
  const requestStartTime = Date.now();
  let messages = [];
  
  try {
    console.log('📥 Parsing request body...');
    const body = await req.json();
    messages = body.messages || [];
    console.log('✅ Request parsed, messages count:', messages.length);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('❌ Invalid messages format');
      return NextResponse.json(
        { error: 'Invalid messages format', success: false },
        { status: 400 }
      );
    }

    // Get the user's latest question
    const userQuestion = messages[messages.length - 1].content;
    console.log('💬 User Question:', userQuestion);
    console.log('📏 Question length:', userQuestion.length, 'characters');

    // Convert messages to LangChain format (exclude system messages)
    const chatHistory = messages
      .slice(0, -1)
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'human' : 'ai',
        content: msg.content,
      }));
    
    console.log('📚 Chat history prepared:', chatHistory.length, 'messages');
    console.log('🚀 Invoking MCP-Enhanced LangChain agent...\n');
    
    // Use MCP-Enhanced LangChain agent with RAG + GitHub MCP tools
    const agentStartTime = Date.now();
    const result = await queryAgentWithMCP(userQuestion, chatHistory);
    const agentDuration = Date.now() - agentStartTime;
    
    console.log('\n✅ Agent completed in', agentDuration, 'ms');
    console.log('📤 Response length:', result.message.length, 'characters');
    console.log('📊 Source:', result.source);
    
    const totalDuration = Date.now() - requestStartTime;
    console.log('⏱️  Total request time:', totalDuration, 'ms');
    console.log('🌐 ========== CHAT API SUCCESS ==========\n');
    
    return NextResponse.json({
      message: result.message,
      success: true,
      source: result.source,
    });

  } catch (error) {
    const totalDuration = Date.now() - requestStartTime;
    console.error('\n❌ ========== CHAT API ERROR ==========');
    console.error('Error Type:', error.constructor.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack?.split('\n').slice(0, 3).join('\n'));
    console.error('⏱️  Failed after:', totalDuration, 'ms');
    
    // Check if it's a quota error
    if (error.status === 429 || error.message?.includes('quota')) {
      console.error('⚠️  QUOTA EXCEEDED - Gemini API rate limit hit');
      console.error('💡 Suggestion: Wait a few minutes or get a new API key');
    }
    
    console.error('❌ ========================================\n');
    
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
