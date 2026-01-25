import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { retrieveRelevantContext, buildContextString } from '@/lib/rag';

// Check if API keys exist
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

if (!process.env.PINECONE_API_KEY) {
  console.error('PINECONE_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

// Simple fallback responses for common questions
function getFallbackResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  if (message.includes('project')) {
    return `Praneeth has worked on several impressive projects including:

🤖 **GenAI Projects:**
- AI-powered Medical Chatbot with RAG
- Resume Automation Tool (1st prize winner in hackathon)
- AI Chat Integration systems

💻 **Full-Stack Projects:**
- E-commerce platforms with payment integration
- Job portals with advanced search
- Real-time collaboration tools

All projects use modern tech stacks like React, Next.js, Node.js, MongoDB, and AI/ML technologies.`;
  }
  
  if (message.includes('skill') || message.includes('tech')) {
    return `Praneeth's technical skills include:

**Frontend:** React.js, Next.js, TypeScript, Tailwind CSS
**Backend:** Node.js, Express.js, Python
**Database:** MongoDB, MySQL, PostgreSQL
**AI/ML:** LangChain, OpenAI, Google Gemini, RAG systems
**Tools:** Git, Docker, AWS, Vercel

He specializes in building full-stack applications with AI integration.`;
  }
  
  if (message.includes('experience') || message.includes('work')) {
    return `Praneeth is currently working as an **Associate Software Engineer Intern** at Connected Value Health Solutions, where he develops healthcare technology solutions.

He's also pursuing B.Tech in Computer Science & Engineering (AI) at Amrita Vishwa Vidyapeetham.

Notable achievement: Won 1st prize in a hackathon for developing a Resume Automation tool.`;
  }
  
  if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
    return `You can reach Praneeth through:

📧 Email: praneethvedagiri@gmail.com
💼 LinkedIn: linkedin.com/in/praneeth-vedagiri
🐙 GitHub: github.com/praneeth-7606

Feel free to connect for collaboration opportunities or project discussions!`;
  }
  
  return `I'm Praneeth's AI assistant! I can help you learn about:

• His projects (GenAI, full-stack, e-commerce)
• Technical skills and expertise
• Work experience and education
• Contact information

What would you like to know?`;
}

export async function POST(req) {
  let messages = [];
  
  try {
    // Check API keys
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy-key') {
      return NextResponse.json(
        { 
          error: 'GEMINI_API_KEY not configured. Please add it to your .env.local file.',
          success: false 
        },
        { status: 500 }
      );
    }

    if (!process.env.PINECONE_API_KEY) {
      console.warn('PINECONE_API_KEY not configured. Using fallback responses.');
      // Don't fail, just use fallback
    }

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

    let contextString = '';
    let relevantDocs = [];

    // Try RAG if Pinecone is configured
    if (process.env.PINECONE_API_KEY) {
      try {
        console.log('🔍 Retrieving relevant context for:', userQuestion);
        relevantDocs = await retrieveRelevantContext(userQuestion, 5);
        contextString = buildContextString(relevantDocs);
        console.log(`✅ Retrieved ${relevantDocs.length} relevant documents`);
      } catch (ragError) {
        console.error('RAG error, falling back:', ragError);
        // Continue without RAG
      }
    }

    // System prompt with RAG context
    const systemPrompt = contextString 
      ? `You are an AI assistant for Praneeth Vedagiri's portfolio. Answer questions based ONLY on the provided context below.

IMPORTANT: Use only the information from the context. If the context doesn't contain relevant information, say so politely.

${contextString}

Be conversational, helpful, and professional. Provide specific details from the context when available.`
      : `You are an AI assistant for Praneeth Vedagiri's portfolio. You help visitors learn about Praneeth's experience, projects, skills, and background.

Be conversational, helpful, and professional.`;

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build conversation context
    let conversationContext = systemPrompt + "\n\n";
    
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.role === 'user') {
        conversationContext += `User: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant' && i > 0) {
        conversationContext += `Assistant: ${msg.content}\n\n`;
      }
    }

    conversationContext += "Assistant: ";

    // Generate response
    const result = await model.generateContent(conversationContext);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No response text from AI');
    }

    return NextResponse.json({
      message: text,
      success: true,
      rag: relevantDocs.length > 0,
      sources: relevantDocs.map(doc => ({
        type: doc.type,
        score: doc.score
      }))
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Get user's last message for fallback
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // If rate limited or any error, use fallback response
    if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('Too Many Requests')) {
      console.log('Rate limited - using fallback response');
      return NextResponse.json({
        message: getFallbackResponse(userMessage),
        success: true,
        fallback: true
      });
    }
    
    // For any other error, use fallback
    console.log('Error occurred - using fallback response');
    return NextResponse.json({
      message: getFallbackResponse(userMessage),
      success: true,
      fallback: true
    });
  }
}
