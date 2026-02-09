/**
 * Unified Agent Orchestration Layer
 * Smart routing with minimal token usage:
 * - Personal data queries → RAG flow (portfolio data)
 * - GitHub queries → MCP flow (GitHub API)
 * - Simple queries → Direct response (zero tokens)
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
      console.log('✅ MCP initialized for unified agent');
    } catch (error) {
      console.error('⚠️ MCP initialization failed:', error.message);
    }
  }
}

/**
 * Main Unified Agent - Smart Query Router
 */
export async function queryUnifiedAgent(userMessage, chatHistory = []) {
  console.log('\n🎯 ========== UNIFIED AGENT START ==========');
  console.log('📝 Query:', userMessage);

  const lowerMessage = userMessage.toLowerCase();

  // ============================================
  // ROUTE 1: GITHUB QUERIES → MCP (No RAG needed)
  // ============================================
  const isGitHubQuery = lowerMessage.includes('github') || 
                        lowerMessage.includes('repo') || 
                        lowerMessage.includes('repository') ||
                        lowerMessage.includes('commit') ||
                        lowerMessage.includes('code on github') ||
                        lowerMessage.includes('git');

  if (isGitHubQuery) {
    console.log('🔧 ROUTE: GitHub MCP Flow');
    return await handleGitHubQuery(userMessage, lowerMessage);
  }

  // ============================================
  // ROUTE 2: DIRECT DATA ROUTES (0 tokens) - Check these BEFORE RAG
  // ============================================
  
  // Projects (check early to avoid RAG)
  if (lowerMessage.includes('project') || lowerMessage.includes('build')) {
    console.log('⚡ ROUTE: Direct Projects (Zero tokens)');
    return await handleProjectQuery(userMessage, lowerMessage);
  }

  // Contact (check early to avoid RAG)
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    console.log('📧 ROUTE: Direct Contact (Zero tokens)');
    const contact = agentTools.getContactInfo();
    return {
      success: true,
      message: `You can reach Praneeth at:\n\n📧 Email: ${contact.email}\n📱 Phone: ${contact.phone}\n🔗 LinkedIn: ${contact.linkedin}\n💼 GitHub: ${contact.github}`,
      source: 'direct-contact',
    };
  }

  // Greetings (check early)
  if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
    console.log('👋 ROUTE: Direct Greeting (Zero tokens)');
    return {
      success: true,
      message: "Hi! I'm Praneeth's AI assistant. I can help you learn about his experience, skills, projects, and GitHub repositories. What would you like to know?",
      source: 'direct-greeting',
    };
  }
  
  // Skills query - Direct data (0 tokens)
  if (lowerMessage.includes('skill') || 
      lowerMessage.includes('technology') ||
      lowerMessage.includes('tech stack') ||
      lowerMessage.includes('technologies')) {
    console.log('⚡ ROUTE: Direct Skills (Zero tokens)');
    return await handleSkillsQuery(userMessage, lowerMessage);
  }

  // Experience query - Direct data (0 tokens) - unless needs reasoning
  if ((lowerMessage.includes('experience') || 
       lowerMessage.includes('work history') ||
       lowerMessage.includes('job') ||
       lowerMessage.includes('career')) &&
      !lowerMessage.includes('why') &&
      !lowerMessage.includes('how') &&
      !lowerMessage.includes('compare')) {
    console.log('⚡ ROUTE: Direct Experience (Zero tokens)');
    return await handleExperienceQuery(userMessage, lowerMessage);
  }

  // Education query - Direct data (0 tokens)
  if (lowerMessage.includes('education') || 
      lowerMessage.includes('degree') ||
      lowerMessage.includes('university') ||
      lowerMessage.includes('college') ||
      lowerMessage.includes('cgpa') ||
      lowerMessage.includes('gpa')) {
    console.log('⚡ ROUTE: Direct Education (Zero tokens)');
    return await handleEducationQuery(userMessage, lowerMessage);
  }

  // ============================================
  // ROUTE 3: COMPLEX PERSONAL QUERIES → RAG Flow (only for reasoning)
  // ============================================
  const needsReasoning = lowerMessage.includes('why') ||
                         lowerMessage.includes('how') ||
                         lowerMessage.includes('compare') ||
                         lowerMessage.includes('qualified') ||
                         lowerMessage.includes('best') ||
                         lowerMessage.includes('explain') ||
                         lowerMessage.includes('relate') ||
                         lowerMessage.includes('difference');

  const isAboutQuery = lowerMessage.includes('about') ||
                       lowerMessage.includes('background') ||
                       lowerMessage.includes('qualification') ||
                       lowerMessage.includes('expertise');

  if (needsReasoning && (isAboutQuery || lowerMessage.includes('genai') || lowerMessage.includes('role'))) {
    console.log('📚 ROUTE: RAG Flow (Complex reasoning needed)');
    return await handlePersonalQuery(userMessage, lowerMessage);
  }

  // ============================================
  // ROUTE 4: FALLBACK → Minimal RAG + LLM
  // ============================================
  console.log('🧠 ROUTE: Fallback RAG + LLM');
  return await handleFallbackQuery(userMessage);
}

/**
 * Handle GitHub queries with MCP (minimal tokens)
 */
async function handleGitHubQuery(userMessage, lowerMessage) {
  await ensureMCPInitialized();

  try {
    let mcpResponse = '';

    // Latest repository
    if (lowerMessage.includes('latest') && (lowerMessage.includes('project') || lowerMessage.includes('repo'))) {
      console.log('📂 MCP: Latest repository');
      mcpResponse = await mcpGetLatestRepository('praneeth-7606');
    }
    // Specific repository
    else if (lowerMessage.match(/repo (?:named|called|for)?\s*(\w+)/i)) {
      const match = lowerMessage.match(/repo (?:named|called|for)?\s*(\w+)/i);
      const repoName = match[1];
      console.log(`📂 MCP: Specific repo - ${repoName}`);
      mcpResponse = await mcpFindRepository('praneeth-7606', repoName);
    }
    // Commit history
    else if (lowerMessage.includes('commit')) {
      console.log('📜 MCP: Commit history');
      const latestRepoData = await mcpGetLatestRepository('praneeth-7606');
      const repoMatch = latestRepoData.match(/name['":\s]+([^\s,"']+)/i);
      if (repoMatch) {
        const repoName = repoMatch[1];
        mcpResponse = await mcpListCommits('praneeth-7606', repoName, { perPage: 5 });
      } else {
        mcpResponse = latestRepoData;
      }
    }
    // General repository search
    else {
      console.log('🔍 MCP: Repository search');
      mcpResponse = await mcpGetUserRepositories('praneeth-7606', { perPage: 5 });
    }

    // Format with LLM (minimal tokens)
    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
      temperature: 0.3,
      maxOutputTokens: 400, // Reduced from 512
    });

    // Ultra-minimal prompt
    const prompt = `Format this GitHub data conversationally. Be concise.\n\nData: ${mcpResponse.substring(0, 1000)}\n\nUser asked: ${userMessage}`;

    const response = await llm.invoke([{ role: 'user', content: prompt }]);

    console.log('✅ GitHub MCP completed');
    console.log('🎯 ========== UNIFIED AGENT END ==========\n');

    return {
      success: true,
      message: response.content,
      source: 'github-mcp',
    };
  } catch (error) {
    console.error('❌ GitHub MCP error:', error);
    return {
      success: true,
      message: `I'm having trouble accessing GitHub data. You can check directly at https://github.com/praneeth-7606`,
      source: 'github-mcp-fallback',
    };
  }
}

/**
 * Handle skills queries directly (ZERO tokens)
 */
async function handleSkillsQuery(userMessage, lowerMessage) {
  console.log('⚡ Direct: Fetching skills (zero tokens)');

  const skillsByCategory = agentTools.getSkillsByCategory();

  // Check if asking for specific category
  const categories = {
    'frontend': ['frontend', 'front-end', 'react', 'ui', 'interface'],
    'backend': ['backend', 'back-end', 'server', 'api'],
    'database': ['database', 'db', 'sql', 'mongo'],
    'ai-ml': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'genai'],
    'tools': ['tool', 'git', 'figma'],
    'devops': ['devops', 'docker', 'aws', 'cloud'],
  };

  let specificCategory = null;
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => lowerMessage.includes(kw))) {
      specificCategory = category;
      break;
    }
  }

  let skillsText = '';

  if (specificCategory && skillsByCategory[specificCategory]) {
    // Show specific category
    const categoryName = specificCategory.replace('-', '/').toUpperCase();
    skillsText = `**${categoryName} Skills:**\n\n` +
      skillsByCategory[specificCategory]
        .map(s => `• ${s.name} (${s.proficiency}% proficiency, ${s.yearsOfExperience}+ years)`)
        .join('\n');
  } else {
    // Show all skills grouped by category
    skillsText = "Here are Praneeth's technical skills:\n\n" +
      Object.entries(skillsByCategory).map(([category, skills]) => {
        const categoryName = category.replace('-', '/').toUpperCase();
        const skillNames = skills.map(s => s.name).join(', ');
        return `**${categoryName}:**\n${skillNames}`;
      }).join('\n\n');
  }

  console.log('✅ Direct skills completed (zero tokens used)');
  console.log('🎯 ========== UNIFIED AGENT END ==========\n');

  return {
    success: true,
    message: skillsText,
    source: 'direct-skills',
  };
}

/**
 * Handle experience queries directly (ZERO tokens)
 */
async function handleExperienceQuery(userMessage, lowerMessage) {
  console.log('⚡ Direct: Fetching experience (zero tokens)');

  const experience = agentTools.getExperience();

  const experienceText = "Here's Praneeth's work experience:\n\n" +
    experience.map((exp, i) =>
      `**${i + 1}. ${exp.title}**\n` +
      `   📍 ${exp.company} | ${exp.location}\n` +
      `   📅 ${exp.duration}\n` +
      `   ${exp.description}\n\n` +
      `   **Key Achievements:**\n` +
      exp.achievements.map(a => `   ${a}`).join('\n') +
      `\n\n   **Technologies:** ${exp.technologies.join(', ')}`
    ).join('\n\n─────────────────────────────────\n\n');

  console.log('✅ Direct experience completed (zero tokens used)');
  console.log('🎯 ========== UNIFIED AGENT END ==========\n');

  return {
    success: true,
    message: experienceText,
    source: 'direct-experience',
  };
}

/**
 * Handle education queries directly (ZERO tokens)
 */
async function handleEducationQuery(userMessage, lowerMessage) {
  console.log('⚡ Direct: Fetching education (zero tokens)');

  const education = agentTools.getEducation();

  const educationText = `**Education:**\n\n` +
    `🎓 **${education.degree}**\n` +
    `🏫 ${education.university}\n` +
    `📍 ${education.location}\n` +
    `📅 ${education.duration}\n` +
    `📊 CGPA: ${education.cgpa}/10\n\n` +
    `**Relevant Coursework:**\n` +
    education.relevantCoursework.map(c => `• ${c}`).join('\n') +
    `\n\n**Achievements:**\n` +
    education.achievements.map(a => `${a}`).join('\n');

  console.log('✅ Direct education completed (zero tokens used)');
  console.log('🎯 ========== UNIFIED AGENT END ==========\n');

  return {
    success: true,
    message: educationText,
    source: 'direct-education',
  };
}

/**
 * Handle personal data queries with RAG (minimal tokens)
 */
async function handlePersonalQuery(userMessage, lowerMessage) {
  try {
    console.log('📊 RAG: Querying portfolio data...');

    // Get relevant context from RAG (minimal docs)
    const ragDocs = await retrieveRelevantContext(userMessage, 2); // Only 2 docs
    const ragContext = buildContextString(ragDocs);

    // Aggressive truncation
    const truncatedContext = ragContext.length > 500 
      ? ragContext.substring(0, 500) + '...' 
      : ragContext;

    console.log(`📏 RAG context: ${truncatedContext.length} chars`);

    // Initialize LLM with minimal settings
    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
      temperature: 0.4,
      maxOutputTokens: 350, // Reduced from 512
    });

    // Ultra-minimal prompt (no system message to save tokens)
    const prompt = `You are Praneeth's assistant. Answer briefly using this data:\n\n${truncatedContext}\n\nQ: ${userMessage}\nA:`;

    console.log('🚀 Calling LLM with minimal tokens...');
    const response = await llm.invoke([{ role: 'user', content: prompt }]);

    console.log('✅ RAG flow completed');
    console.log('🎯 ========== UNIFIED AGENT END ==========\n');

    return {
      success: true,
      message: response.content,
      source: 'rag-personal',
    };
  } catch (error) {
    console.error('❌ RAG error:', error);
    
    // Fallback without LLM
    return {
      success: true,
      message: "I can help you learn about Praneeth's experience, skills, education, and projects. What specific area interests you?",
      source: 'rag-fallback',
    };
  }
}

/**
 * Handle project queries directly (ZERO tokens)
 */
async function handleProjectQuery(userMessage, lowerMessage) {
  console.log('⚡ Direct: Fetching projects (zero tokens)');

  const projects = agentTools.getProjects();

  // If asking for specific number
  const numberMatch = lowerMessage.match(/(\d+)\s+project/);
  const count = numberMatch ? parseInt(numberMatch[1]) : 3;

  const topProjects = projects.slice(0, Math.min(count, projects.length));

  const projectsText = `Here are ${topProjects.length} of Praneeth's key projects:\n\n` +
    topProjects.map((p, i) => 
      `${i + 1}. **${p.title}**\n   ${p.description}\n   Tech: ${p.techStack.slice(0, 4).join(', ')}`
    ).join('\n\n');

  console.log('✅ Direct projects completed (zero tokens used)');
  console.log('🎯 ========== UNIFIED AGENT END ==========\n');

  return {
    success: true,
    message: projectsText,
    source: 'direct-projects',
  };
}

/**
 * Fallback for unclear queries (minimal RAG + LLM)
 */
async function handleFallbackQuery(userMessage) {
  try {
    console.log('🔍 Fallback: Minimal RAG + LLM');

    // Get minimal context
    const ragDocs = await retrieveRelevantContext(userMessage, 1); // Only 1 doc
    const ragContext = buildContextString(ragDocs);
    const truncatedContext = ragContext.length > 400 
      ? ragContext.substring(0, 400) + '...' 
      : ragContext;

    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.PORTFOLIO_GEMINI_KEY || process.env.GEMINI_API_KEY,
      temperature: 0.5,
      maxOutputTokens: 300, // Minimal
    });

    const prompt = `You are Praneeth's assistant. Answer briefly.\n\nContext: ${truncatedContext}\n\nQ: ${userMessage}\nA:`;

    const response = await llm.invoke([{ role: 'user', content: prompt }]);

    console.log('✅ Fallback completed');
    console.log('🎯 ========== UNIFIED AGENT END ==========\n');

    return {
      success: true,
      message: response.content,
      source: 'fallback-rag',
    };
  } catch (error) {
    console.error('❌ Fallback error:', error);
    return {
      success: true,
      message: "I'm Praneeth's AI assistant. I can help you learn about his experience, skills, projects, and GitHub repositories. What would you like to know?",
      source: 'final-fallback',
    };
  }
}
