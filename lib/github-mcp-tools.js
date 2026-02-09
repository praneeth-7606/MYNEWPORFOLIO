/**
 * GitHub MCP Tools Wrapper
 * Provides high-level functions that use MCP instead of direct API calls
 */

import { callMCPTool, initializeMCP } from './mcp-client.js';

/**
 * Search GitHub repositories using MCP
 */
export async function mcpSearchRepositories(query, options = {}) {
  try {
    const result = await callMCPTool('search_repositories', {
      query,
      page: options.page || 1,
      perPage: options.perPage || 10,
    });

    return result.content[0]?.text || 'No repositories found';
  } catch (error) {
    console.error('MCP search_repositories error:', error);
    throw error;
  }
}

/**
 * Get file contents from a repository using MCP
 */
export async function mcpGetFileContents(owner, repo, path, branch = 'main') {
  try {
    const result = await callMCPTool('get_file_contents', {
      owner,
      repo,
      path,
      ...(branch && { branch }),
    });

    return result.content[0]?.text || 'File not found';
  } catch (error) {
    console.error('MCP get_file_contents error:', error);
    throw error;
  }
}

/**
 * List commits for a repository using MCP
 */
export async function mcpListCommits(owner, repo, options = {}) {
  try {
    const result = await callMCPTool('list_commits', {
      owner,
      repo,
      page: options.page || 1,
      perPage: options.perPage || 10,
      ...(options.branch && { sha: options.branch }),
    });

    return result.content[0]?.text || 'No commits found';
  } catch (error) {
    console.error('MCP list_commits error:', error);
    throw error;
  }
}

/**
 * Create an issue using MCP
 */
export async function mcpCreateIssue(owner, repo, title, body) {
  try {
    const result = await callMCPTool('create_issue', {
      owner,
      repo,
      title,
      body,
    });

    return result.content[0]?.text || 'Issue created';
  } catch (error) {
    console.error('MCP create_issue error:', error);
    throw error;
  }
}

/**
 * Create or update a file using MCP
 */
export async function mcpCreateOrUpdateFile(owner, repo, path, content, message, branch = 'main') {
  try {
    const result = await callMCPTool('create_or_update_file', {
      owner,
      repo,
      path,
      content,
      message,
      branch,
    });

    return result.content[0]?.text || 'File updated';
  } catch (error) {
    console.error('MCP create_or_update_file error:', error);
    throw error;
  }
}

/**
 * Push files to repository using MCP
 */
export async function mcpPushFiles(owner, repo, branch, files, message) {
  try {
    const result = await callMCPTool('push_files', {
      owner,
      repo,
      branch,
      files,
      message,
    });

    return result.content[0]?.text || 'Files pushed';
  } catch (error) {
    console.error('MCP push_files error:', error);
    throw error;
  }
}

/**
 * Create a pull request using MCP
 */
export async function mcpCreatePullRequest(owner, repo, title, body, head, base) {
  try {
    const result = await callMCPTool('create_pull_request', {
      owner,
      repo,
      title,
      body,
      head,
      base,
    });

    return result.content[0]?.text || 'Pull request created';
  } catch (error) {
    console.error('MCP create_pull_request error:', error);
    throw error;
  }
}

/**
 * Fork a repository using MCP
 */
export async function mcpForkRepository(owner, repo, organization = null) {
  try {
    const result = await callMCPTool('fork_repository', {
      owner,
      repo,
      ...(organization && { organization }),
    });

    return result.content[0]?.text || 'Repository forked';
  } catch (error) {
    console.error('MCP fork_repository error:', error);
    throw error;
  }
}

/**
 * Create a repository using MCP
 */
export async function mcpCreateRepository(name, options = {}) {
  try {
    const result = await callMCPTool('create_repository', {
      name,
      description: options.description,
      private: options.private || false,
      autoInit: options.autoInit || false,
    });

    return result.content[0]?.text || 'Repository created';
  } catch (error) {
    console.error('MCP create_repository error:', error);
    throw error;
  }
}

/**
 * Get user's repositories (searches for user:username)
 */
export async function mcpGetUserRepositories(username, options = {}) {
  try {
    const query = `user:${username} sort:updated-desc`;
    return await mcpSearchRepositories(query, options);
  } catch (error) {
    console.error('MCP get user repositories error:', error);
    throw error;
  }
}

/**
 * Get latest repository for a user
 */
export async function mcpGetLatestRepository(username) {
  try {
    const query = `user:${username} sort:updated-desc`;
    const result = await mcpSearchRepositories(query, { perPage: 1 });
    return result;
  } catch (error) {
    console.error('MCP get latest repository error:', error);
    throw error;
  }
}

/**
 * Search for a specific repository by name
 */
export async function mcpFindRepository(username, repoName) {
  try {
    const query = `user:${username} ${repoName} in:name`;
    const result = await mcpSearchRepositories(query, { perPage: 5 });
    return result;
  } catch (error) {
    console.error('MCP find repository error:', error);
    throw error;
  }
}
