/**
 * MCP Client for GitHub Integration
 * Connects to the GitHub MCP server 
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

let mcpClient = null;
let isConnected = false;

/**
 * Initialize MCP connection to GitHub server
 */
export async function initializeMCP() {
  if (isConnected && mcpClient) {
    console.log('✅ MCP already connected');
    return mcpClient;
  }

  try {
    console.log('🔌 Initializing GitHub MCP connection...');

    // Create transport using the installed @modelcontextprotocol/server-github package
    // Using node instead of npx for Vercel serverless compatibility
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['node_modules/@modelcontextprotocol/server-github/dist/index.js'],
      env: {
        ...process.env,
        GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN || process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      },
    });

    // Create MCP client
    mcpClient = new Client({
      name: 'portfolio-chatbot',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
      },
    });

    // Connect to server
    await mcpClient.connect(transport);
    isConnected = true;

    console.log('✅ GitHub MCP connected successfully');

    // List available tools
    const tools = await mcpClient.listTools();
    console.log('📋 Available MCP tools:', tools.tools.map(t => t.name).join(', '));

    return mcpClient;
  } catch (error) {
    console.error('❌ Failed to initialize MCP:', error.message);
    isConnected = false;
    mcpClient = null;
    throw error;
  }
}

/**
 * Call a GitHub MCP tool
 */
export async function callMCPTool(toolName, args = {}) {
  try {
    if (!mcpClient || !isConnected) {
      await initializeMCP();
    }

    console.log(`🔧 Calling MCP tool: ${toolName}`, args);

    const result = await mcpClient.callTool({
      name: toolName,
      arguments: args,
    });

    console.log(`✅ MCP tool ${toolName} completed`);
    return result;
  } catch (error) {
    console.error(`❌ MCP tool ${toolName} failed:`, error.message);
    throw error;
  }
}

/**
 * Get list of available MCP tools
 */
export async function listMCPTools() {
  try {
    if (!mcpClient || !isConnected) {
      await initializeMCP();
    }

    const tools = await mcpClient.listTools();
    return tools.tools;
  } catch (error) {
    console.error('❌ Failed to list MCP tools:', error.message);
    return [];
  }
}

/**
 * Close MCP connection
 */
export async function closeMCP() {
  if (mcpClient && isConnected) {
    try {
      await mcpClient.close();
      console.log('🔌 MCP connection closed');
    } catch (error) {
      console.error('❌ Error closing MCP:', error.message);
    }
    mcpClient = null;
    isConnected = false;
  }
}

// Graceful shutdown
process.on('SIGINT', closeMCP);
process.on('SIGTERM', closeMCP);
