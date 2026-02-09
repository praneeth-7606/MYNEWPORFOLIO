/**
 * LangChain Agent with GitHub MCP Integration
 * Enhanced version that uses MCP for GitHub operations
 */

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { retrieveRelevantContext, buildContextString } from './rag.js';
import { agentTools } from './agent-tools.js';
import { 
  mcpSearchRepositories, 
  mcpFindRepository,
  mcpListCommits,
  mcpGetUserRepositories,
  mcpGetLatestRepository,
  mcpGetFileContents
} from './github-mcp-tools.js';
import { initializeMCP } from './mcp-client.js';

// Initialize MCP on module load
let mcpInitialized = false;
async function ensureMCPInitialized() {
  if (!mcpInitialized) {
    try {
      await initializeMCP();
      mcpInitialized = true;
      console.log('✅ MCP initialized for agent');
    } catch (error) {
      console.error('⚠️ MCP initialization failed, will use fallback:', error.message);
    }
  }
}

/**
 * Process a user query with MCP-enhanced GitHub capabilities
 */
export async function queryAgentWithMCP(userMessage, chatHistory = []) {
  console.log('\n ========== MCP AGENT FLOW START ==========');
  console.log('User Query:', userMessage);

  const lowerMessage = userMessage.toLowerCase();

  // Ensure MCP is ready
  await ensureMCPInitialized();

  // 1. GitHub Queries with MCP
  const isGitHubQuery = lowerMessage.includes('github') || 
                        lowerMessage.includes('repo') || 
                        lowerMessage.includes('repository') ||
                        lowerMessage.includes('code') ||
                        lowerMessage.includes('commit');

  if (isGitHubQuery) {
    console.log('🔧 GITHUB MCP MODE: Processing with MCP tools');
    try {
      let mcpResponse = '';

      // Latest repository query
      if (lowerMessage.includes('latest') && (lowerMessage.includes('project') || lowerMessage.includes('repo'))) {
        console.log('Fetching latest repository via MCP...');
        mcpResponse = await mcpGetLatestRepository('praneeth-7606');
      }
      // Specific repository query
      else if (lowerMessage.match(/repo (?:named|called|for)?\s*(\w+)/i)) {
        const match = lowerMessage.match(/repo (?:named|called|for)?\s*(\w+)/i);
        const repoName = match[1];
        console.log(` Fetching specific repository: ${repoName}`);
        mcpResponse = await mcpFindRepository('praneeth-7606', repoName);
      }
      // Commit history query
      else if (lowerMessage.includes('commit')) {
        console.log(' Fetching commit history via MCP...');
        // Get latest repo first, then its commits
        const latestRepoData = await mcpGetLatestRepository('praneeth-7606');
        // Extract repo name from response (simplified)
        const repoMatch = latestRepoData.match(/Repository:\s*([^\s]+)/);
        if (repoMatch) {
          const repoName = repoMatch[1];
          mcpResponse = await mcpListCommits('praneeth-7606', repoName, { perPage: 10 });
        } else {
          mcpResponse = latestRepoData;
        }
      }
      // General repository search
      else {
        console.log('🔍 Searching repositories via MCP...');
        mcpResponse = await mcpGetUserRepositories('praneeth-7606', { perPage: 10 });
      }

      // Use LLM to format the MCP response nicely
      const llm = new ChatGoogleGenerativeAI({
        model: 'gemini-2.0-flash',
        apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
        temperature: 0.3,
        maxOutputTokens: 512,
      });

      const formattingPrompt = `You are Praneeth's AI assistant. Format this GitHub data in a friendly, conversational way.

GitHub Data:
${mcpResponse}

User asked: ${userMessage}

Provide a clear, concise response. Include relevant links and stats.`;

      const response = await llm.invoke([
        { role: 'user', content: formattingPrompt }
      ]);

      console.log('✅ MCP GitHub query completed');
      console.log('🤖 ========== MCP AGENT FLOW END ==========\n');

      return {
        success: true,
        message: response.content,
        source: 'github-mcp',
      };
    } catch (error) {
      console.error('❌ MCP GitHub error:', error);
      // Fallback to direct response
      return {
        success: true,
        message: `I'm having trouble accessing GitHub data right now. You can check directly at https://github.com/praneeth-7606`,
        source: 'github-mcp-fallback',
      };
    }
  }

  // 2. Project queries (Portfolio data)
  if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('work')) {
    console.log('⚡ DIRECT MODE: Handling Project query');
    const projects = agentTools.getProjects().slice(0, 3);
    const projectsText = "Here are some of Praneeth's key projects:\n\n" +
      projects.map(p => `**${p.title}**\n${p.description}\nStack: ${p.techStack.join(', ')}`).join('\n\n');

    return { success: true, message: projectsText, source: 'projects-direct' };
  }

  // 3. Conversational Mode (LLM with RAG)
  console.log('🧠 CONVERSATIONAL MODE: Using LLM with RAG');

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
      temperature: 0.5,
      maxOutputTokens: 512,
    });

    // Gather context from RAG
    console.log('📊 Gathering context from RAG...');
    const ragDocs = await retrieveRelevantContext(userMessage, 2);
    const ragContext = buildContextString(ragDocs);
    const truncatedContext = ragContext.length > 600 ? ragContext.substring(0, 600) + '...' : ragContext;

    const systemPrompt = `You are Praneeth's AI assistant. Answer briefly and conversationally.
    Reply to each user query with "OK bro here is answer to your question Dont give okay praneeth in the user question response"

Context:
${truncatedContext}

Be helpful and concise.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    console.log('🚀 Calling Gemini API...');
    const response = await llm.invoke(messages);

    console.log('✅ Response received');
    console.log('🤖 ========== MCP AGENT FLOW END ==========\n');

    return {
      success: true,
      message: response.content,
      source: 'langchain-agent-rag-mcp',
    };
  } catch (error) {
    console.error('❌ Agent error:', error);
    return {
      success: true,
      message: "I'm currently experiencing high traffic. Please try again in a moment.",
      source: 'agent-fallback',
    };
  }
}
