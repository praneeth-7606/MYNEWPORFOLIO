/**
 * LangChain Agent Orchestration Layer
 * Integrates RAG (Pinecone + Gemini) and GitHub
 */

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { retrieveRelevantContext, buildContextString } from './rag.js';
import { fetchGitHubRepos, fetchGitHubProfile, searchGitHubRepos, getOptimizedGithubData, findSpecificRepo, getLatestRepo, getRecentCommits } from './github-tools.js';
import { agentTools } from './agent-tools.js';

/**
 * Process a user query through the agent orchestration
 */
export async function queryAgent(userMessage, chatHistory = []) {
  console.log('\n🤖 ========== AGENT FLOW START ==========');
  console.log('📝 User Query:', userMessage);

  const lowerMessage = userMessage.toLowerCase();

  // 1. Direct Response Mode (Zero Latency, Zero Quota)

  // FIX: Check for "latest project" specifically FIRST before generic project check acts
  if (lowerMessage.includes('latest') && (lowerMessage.includes('project') || lowerMessage.includes('repo'))) {
    console.log('⚡ DIRECT MODE: Handling Latest Repo query');
    const latestData = await getLatestRepo('praneeth-7606');
    return { success: true, message: latestData, source: 'github-latest' };
  }

  // Check for GitHub/Repo keywords
  const isGitHubQuery = lowerMessage.includes('github') || lowerMessage.includes('repo') || lowerMessage.includes('code');

  // If user asks for commits, we want to fetch them but use LLM to explain
  let additionalContext = "";
  if (lowerMessage.includes('commit')) {
    console.log('🔍 Fetching commit history for LLM context...');
    const commitData = await getRecentCommits('praneeth-7606');
    additionalContext = `\n\nRecent Commit History:\n${commitData}`;
  }

  if (isGitHubQuery) {
    console.log('⚡ DIRECT MODE: Handling GitHub query without LLM');
    try {
      // Check for specific repo request: "show me the [name] repo"
      const specificMatch = lowerMessage.match(/repo (?:named|called|for)?\s*(\w+)/i) ||
        lowerMessage.match(/code (?:for|of)?\s*(\w+)/i) ||
        lowerMessage.match(/(\w+) repo/i);

      if (specificMatch && specificMatch[1] && !['github', 'my', 'the', 'show', 'latest'].includes(specificMatch[1])) {
        const repoName = specificMatch[1];
        console.log(`🎯 Searching for specific repo: ${repoName}`);
        const specificData = await findSpecificRepo(repoName, 'praneeth-7606');
        return { success: true, message: specificData, source: 'github-direct-specific' };
      }

      // Default to summary
      const githubData = await getOptimizedGithubData('praneeth-7606');
      return { success: true, message: githubData, source: 'github-direct' };
    } catch (e) {
      console.error('❌ GitHub Direct Error:', e);
      return { success: true, message: "Could not fetch GitHub data at this time.", source: 'github-error' };
    }
  }

  // Check for STATIC Project keywords (Only if it wasn't a "lastest project" or "git project")
  // This is for "Tell me about your projects" (Portfolio data)
  if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('work')) {
    console.log('⚡ DIRECT MODE: Handling Project query without LLM');
    // Get top 3 projects formatted
    const projects = agentTools.getProjects().slice(0, 3);
    const projectsText = "Here are some of Praneeth's key projects:\n\n" +
      projects.map(p => `**${p.title}**\n${p.description}\nStack: ${p.techStack.join(', ')}`).join('\n\n');

    return { success: true, message: projectsText, source: 'projects-direct' };
  }

  // 2. Conversational Mode (LLM)
  // Only for greetings, "who are you", or complex questions
  console.log('🧠 CONVERSATIONAL MODE: Using LLM for reasoning');

  try {
    // Verify API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment');
      throw new Error('GEMINI_API_KEY not found in environment');
    }
    console.log('✅ API Key verified');

    // Initialize Gemini LLM with gemini-2.0-flash
    console.log('🔧 Initializing Gemini 2.0 Flash model...');
    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
      temperature: 0.5,
      maxOutputTokens: 512,
    });
    console.log('✅ LLM initialized with gemini-2.0-flash');

    // Step 1: Determine intent and gather context
    console.log('\n📊 Step 1: Gathering minimal context...');
    let context = await gatherContext(userMessage);

    // Append commit data if we fetched it
    if (additionalContext) {
      context += additionalContext;
    }

    console.log('✅ Context gathered');
    console.log('📏 Context length:', context.length, 'characters');

    // Step 2: Build ultra-minimal prompt
    console.log('\n📝 Step 2: Building minimal prompt...');
    const systemPrompt = `You are Praneeth's AI assistant. Answer briefly.
${context}
Be concise.`;

    // Step 3: NO chat history to save maximum tokens
    console.log('\n💬 Step 3: Formatting messages (no history)...');
    console.log('📚 Skipping chat history to save tokens');

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const totalTokensEstimate = messages.reduce((sum, msg) => sum + msg.content.length, 0) / 4;
    console.log('📊 Estimated input tokens:', Math.round(totalTokensEstimate));

    // Step 3: Get response from LLM with Quota Fallback
    console.log('\n🚀 Step 3: Calling Gemini API...');
    const startTime = Date.now();
    let responseContent = '';

    try {
      const response = await llm.invoke(messages);
      responseContent = response.content;

      const duration = Date.now() - startTime;
      console.log('✅ Response received in', duration, 'ms');
      console.log('📏 Response length:', responseContent.length, 'characters');
    } catch (llmError) {
      console.error('⚠️ LLM Error (likely Quota):', llmError.message);

      // FALLBACK: If LLM fails (429 Quota), return the raw context
      if (context.length > 10) {
        console.log('↩️ Swapping to FALLBACK mode using raw context');
        responseContent = "⚠️ I'm currently hitting my AI rate limits, but here is the data I found:\n\n" + context;
      } else {
        throw llmError;
      }
    }

    console.log('🤖 ========== AGENT FLOW END ==========\n');

    return {
      success: true,
      message: responseContent,
      source: 'langchain-agent-rag',
    };
  } catch (error) {
    console.error('\n❌ ========== AGENT ERROR ==========');
    console.error('Error Type:', error.constructor.name);
    console.error('Error Message:', error.message);
    if (error.status) console.error('HTTP Status:', error.status);
    if (error.errorDetails) console.error('Error Details:', JSON.stringify(error.errorDetails, null, 2));
    console.error('❌ ========================================\n');

    // Last resort fallback
    return {
      success: true,
      message: "I'm currently experiencing high traffic. Please try again in 30 seconds or check GitHub directly at https://github.com/praneeth-7606",
      source: 'agent-fallback'
    };
  }
}

/**
 * Gather relevant context from RAG (ULTRA-MINIMAL for quota saving)
 */
async function gatherContext(userMessage) {
  console.log('  🔍 Analyzing query intent...');
  // We already handled GitHub/Projects in Direct Mode, so this is ONLY for RAG now
  try {
    console.log('  🔍 Querying RAG system (minimal)...');
    const ragDocs = await retrieveRelevantContext(userMessage, 1);
    console.log('  ✅ Retrieved', ragDocs.length, 'RAG documents');
    const ragContext = buildContextString(ragDocs);

    // Aggressive truncation: max 600 chars
    const truncatedRagContext = ragContext.length > 600
      ? ragContext.substring(0, 600) + '...'
      : ragContext;

    console.log('  📏 RAG context:', truncatedRagContext.length, 'characters');
    console.log('  ✅ Total context:', truncatedRagContext.length, 'characters');
    return truncatedRagContext;
  } catch (error) {
    console.error('  ❌ RAG error:', error.message);
    return 'Portfolio data unavailable.';
  }
}
