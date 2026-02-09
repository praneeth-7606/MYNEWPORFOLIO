# GitHub MCP Internal Working - Complete Guide

## What is MCP (Model Context Protocol)?

MCP is a **standardized protocol** created by Anthropic that allows AI applications to connect to external data sources and tools through a client-server architecture.

Think of it as a **universal adapter** that lets your AI agent talk to different services (GitHub, databases, file systems, etc.) using a common language.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR PORTFOLIO APP                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         LangChain Agent (Orchestrator)             │    │
│  │                                                     │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │    │
│  │  │   RAG    │  │  GitHub  │  │  Other Tools │    │    │
│  │  │ (Pinecone│  │   MCP    │  │              │    │    │
│  │  │ + Gemini)│  │          │  │              │    │    │
│  │  └────┬─────┘  └────┬─────┘  └──────────────┘    │    │
│  └───────┼─────────────┼─────────────────────────────┘    │
│          │             │                                    │
└──────────┼─────────────┼────────────────────────────────────┘
           │             │
           │             │ MCP Protocol (JSON-RPC)
           │             │
           │        ┌────▼──────────────────────────┐
           │        │   MCP Client (in Kiro IDE)    │
           │        │   - Manages connections       │
           │        │   - Handles authentication    │
           │        │   - Routes tool calls         │
           │        └────┬──────────────────────────┘
           │             │
           │             │ stdio/HTTP
           │             │
           │        ┌────▼──────────────────────────┐
           │        │  GitHub MCP Server (uvx)      │
           │        │  - Runs as separate process   │
           │        │  - Exposes GitHub API tools   │
           │        │  - Uses your GitHub token     │
           │        └────┬──────────────────────────┘
           │             │
           │             │ GitHub REST API
           │             │
           │        ┌────▼──────────────────────────┐
           │        │      GitHub.com API           │
           │        │  - Repositories               │
           │        │  - Issues, PRs, Commits       │
           │        │  - File contents              │
           │        └───────────────────────────────┘
           │
           ▼
    ┌──────────────────┐
    │  Pinecone Cloud  │
    │  Vector Database │
    └──────────────────┘
```

---

## How GitHub MCP Works Internally

### 1. **Configuration Phase** (.kiro/settings/mcp.json)

```json
{
  "mcpServers": {
    "github": {
      "command": "uvx",                    // Python package runner
      "args": ["mcp-server-github"],       // MCP server package
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx"  // Your token
      },
      "disabled": false,
      "autoApprove": [                     // Tools that don't need confirmation
        "search_repositories",
        "get_file_contents",
        "list_commits"
      ]
    }
  }
}
```

**What happens:**
- Kiro IDE reads this config on startup
- Spawns a child process: `uvx mcp-server-github`
- The MCP server starts and listens for commands via **stdio** (standard input/output)
- Server registers available tools with the MCP client

---

### 2. **Server Initialization**

When `uvx mcp-server-github` runs:

```python
# Pseudo-code of what happens inside mcp-server-github

class GitHubMCPServer:
    def __init__(self):
        self.github_token = os.getenv('GITHUB_PERSONAL_ACCESS_TOKEN')
        self.github_client = GitHub(auth=self.github_token)
        
    def register_tools(self):
        return [
            {
                "name": "search_repositories",
                "description": "Search GitHub repositories",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string"},
                        "owner": {"type": "string"}
                    }
                }
            },
            {
                "name": "get_file_contents",
                "description": "Get contents of a file from a repository",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "owner": {"type": "string"},
                        "repo": {"type": "string"},
                        "path": {"type": "string"}
                    }
                }
            },
            # ... more tools
        ]
    
    def handle_tool_call(self, tool_name, arguments):
        if tool_name == "search_repositories":
            return self.search_repos(arguments['query'], arguments['owner'])
        elif tool_name == "get_file_contents":
            return self.get_file(arguments['owner'], arguments['repo'], arguments['path'])
```

---

### 3. **Communication Protocol (JSON-RPC)**

MCP uses **JSON-RPC 2.0** over stdio. Here's what a typical exchange looks like:

#### Request from Client → Server:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_repositories",
    "arguments": {
      "query": "AI chatbot",
      "owner": "praneeth-7606"
    }
  }
}
```

#### Response from Server → Client:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Found 3 repositories:\n1. medical-chatbot-rag\n2. resume-automation\n3. ai-portfolio"
      }
    ]
  }
}
```

---

### 4. **Integration with Your Agent**

Currently, you have **TWO separate GitHub integrations**:

#### A. **Direct GitHub API** (lib/github-tools.js)
```javascript
// This is what you're using NOW
export async function fetchGitHubRepos(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  });
  return response.json();
}
```

**Pros:** Simple, direct, no dependencies
**Cons:** Limited to what you manually code, no standardization

#### B. **GitHub MCP** (configured but not used in code yet)
```javascript
// This is what MCP WOULD look like if integrated
import { MCPClient } from '@modelcontextprotocol/sdk';

const mcpClient = new MCPClient();
await mcpClient.connectToServer('github');

// Call MCP tool
const result = await mcpClient.callTool('search_repositories', {
  query: 'AI chatbot',
  owner: 'praneeth-7606'
});
```

**Pros:** Standardized, more tools available, better error handling
**Cons:** Requires MCP SDK, more complex setup

---

## Why Use MCP vs Direct API?

### Direct GitHub API (Current):
```javascript
// You write custom code for each operation
async function getRepos() { /* fetch logic */ }
async function getCommits() { /* fetch logic */ }
async function getIssues() { /* fetch logic */ }
// ... 20 more functions
```

### GitHub MCP (Standardized):
```javascript
// MCP server provides pre-built tools
mcpClient.callTool('get_repositories')
mcpClient.callTool('list_commits')
mcpClient.callTool('search_issues')
mcpClient.callTool('get_file_contents')  // ← This is powerful!
mcpClient.callTool('create_issue')
// ... 50+ tools available out of the box
```

---

## MCP Tools Available in GitHub Server

The `mcp-server-github` provides these tools:

1. **search_repositories** - Search repos by query
2. **get_repository** - Get single repo details
3. **list_commits** - Get commit history
4. **get_file_contents** - Read file from repo (🔥 powerful!)
5. **create_issue** - Create GitHub issues
6. **create_pull_request** - Create PRs
7. **fork_repository** - Fork repos
8. **create_branch** - Create branches
9. **search_code** - Search code across repos
10. **get_issue** - Get issue details

---

## How to Actually Use MCP in Your Code

### Option 1: Use MCP SDK (Proper Way)

```javascript
// lib/github-mcp-client.js
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

let mcpClient = null;

export async function getGitHubMCPClient() {
  if (mcpClient) return mcpClient;

  const transport = new StdioClientTransport({
    command: 'uvx',
    args: ['mcp-server-github'],
    env: {
      GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_TOKEN
    }
  });

  mcpClient = new Client({
    name: 'portfolio-agent',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  await mcpClient.connect(transport);
  return mcpClient;
}

export async function searchGitHubRepos(query, owner) {
  const client = await getGitHubMCPClient();
  
  const result = await client.callTool({
    name: 'search_repositories',
    arguments: { query, owner }
  });
  
  return result.content[0].text;
}
```

### Option 2: Keep Direct API (Simpler, Current Approach)

Your current `lib/github-tools.js` is perfectly fine! It's simpler and works well.

---

## Current State of Your System

### ✅ What's Working:
1. **RAG System**: Pinecone + Gemini embeddings ✓
2. **Direct GitHub API**: Fetching repos via REST API ✓
3. **LangChain Agent**: Orchestrating RAG + GitHub ✓
4. **MCP Configuration**: Set up in `.kiro/settings/mcp.json` ✓

### ⚠️ What's NOT Connected:
- **MCP Server**: Configured but not used in your code
- Your agent uses **direct GitHub API**, not MCP tools

---

## Should You Switch to MCP?

### Keep Direct API if:
- ✅ You only need basic repo info (name, stars, description)
- ✅ You want simpler code
- ✅ You don't need advanced features

### Switch to MCP if:
- ✅ You want to read **file contents** from repos
- ✅ You want to create issues/PRs programmatically
- ✅ You want 50+ pre-built GitHub tools
- ✅ You want standardized error handling

---

## Recommendation for Your Portfolio

**Keep your current approach!** Here's why:

1. Your direct GitHub API integration works perfectly
2. You only need basic repo info (name, stars, description, URL)
3. MCP adds complexity without much benefit for your use case
4. The MCP config in Kiro is for **IDE features** (like asking Kiro to create PRs), not for your portfolio chat

---

## Summary

```
┌─────────────────────────────────────────────────────────┐
│  YOUR CURRENT ARCHITECTURE (Perfect for Portfolio!)     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User Question                                           │
│       ↓                                                  │
│  LangChain Agent (Orchestrator)                          │
│       ↓                                                  │
│  ┌─────────────────┐    ┌──────────────────┐           │
│  │  RAG System     │    │  GitHub REST API │           │
│  │  (Pinecone +    │    │  (Direct fetch)  │           │
│  │   Gemini)       │    │                  │           │
│  │                 │    │                  │           │
│  │ • Projects      │    │ • Repos list     │           │
│  │ • Experience    │    │ • Stars/Forks    │           │
│  │ • Skills        │    │ • Languages      │           │
│  │ • Personal Info │    │ • Descriptions   │           │
│  └─────────────────┘    └──────────────────┘           │
│       ↓                          ↓                      │
│       └──────────┬───────────────┘                      │
│                  ↓                                      │
│         Gemini LLM (Generates Answer)                   │
│                  ↓                                      │
│         User gets accurate response!                    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Your system is already optimal!** The MCP setup in Kiro is for IDE automation, not for your portfolio chat agent.

