import fs from 'fs';
import path from 'path';

// GitHub API integration for fetching repository data
// This can be enhanced with MCP connection later

const GITHUB_CACHE_PATH = path.join(process.cwd(), 'data', 'github-cache.json');

/**
 * Fetch repositories using "Sync-then-Read" architecture.
 * Priority: Local Cache -> Live API (Fallback)
 */
export async function fetchGitHubRepos(username) {
  try {
    // 1. Try reading from local cache (Instant)
    if (fs.existsSync(GITHUB_CACHE_PATH)) {
      const cacheRaw = fs.readFileSync(GITHUB_CACHE_PATH, 'utf8');
      const cache = JSON.parse(cacheRaw);

      // Simple validation
      if (cache.repos && Array.isArray(cache.repos)) {
        console.log('🚀 CACHE HIT: Serving GitHub data from disk (0ms)');
        return cache.repos;
      }
    }
  } catch (e) {
    console.warn('⚠️ Cache read failed, falling back to live API:', e.message);
  }

  // 2. Fallback to Live API (Slow, Rate Limited)
  console.log('⚠️ CACHE MISS: Fetching live GitHub data...');
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const data = await response.json();

    // Transform data
    const repos = data.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
    })).sort((a, b) => b.stars - a.stars); // Sort by stars DESC

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Find specific repositories based on a keyword query
 * Used for "Show me the [name] repo" type queries
 */
export async function findSpecificRepo(query, username) {
  const repos = await fetchGitHubRepos(username);
  if (!repos || repos.length === 0) return "No GitHub data available.";

  const lowerQuery = query.toLowerCase();

  // Filter repos by name, description, language, or topic
  const matches = repos.filter(repo =>
    repo.name.toLowerCase().includes(lowerQuery) ||
    (repo.description && repo.description.toLowerCase().includes(lowerQuery)) ||
    (repo.language && repo.language.toLowerCase() === lowerQuery) ||
    (repo.topics && repo.topics.some(t => t.toLowerCase().includes(lowerQuery)))
  );

  if (matches.length === 0) {
    return `I couldn't find any repositories matching "${query}". You can check all repositories at https://github.com/${username}`;
  }

  // If exact match found (by name), prioritize it
  const exactMatch = matches.find(r => r.name.toLowerCase() === lowerQuery);
  if (exactMatch) {
    return `**Found the repository:**\n\n` +
      `📂 [${exactMatch.name}](${exactMatch.url})\n` +
      `⭐ ${exactMatch.stars} | 🍴 ${exactMatch.forks} | 🔵 ${exactMatch.language || 'N/A'}\n` +
      `📝 ${exactMatch.description || 'No description'}\n` +
      `Last updated: ${new Date(exactMatch.updatedAt).toLocaleDateString()}`;
  }

  // Limitation: Return top 3 matches to keep it clean
  const topMatches = matches.slice(0, 3);

  return `Found ${matches.length} repository matches for "${query}":\n\n` +
    topMatches.map(r =>
      `📂 [${r.name}](${r.url}) (${r.language || 'N/A'})\n` +
      `⭐ ${r.stars} | ${r.description ? r.description.substring(0, 80) + '...' : ''}`
    ).join('\n\n') +
    (matches.length > 3 ? `\n\n...and ${matches.length - 3} more.` : '');
}

/**
 * Get highly optimized repository data for LLM context
 * Returns top 5 repos + summary statistics to save tokens
 */
export async function getOptimizedGithubData(username) {
  const repos = await fetchGitHubRepos(username);

  if (!repos || repos.length === 0) return "No GitHub data available.";

  // Calculate simple stats
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 5).join(', ');

  // Get top 5 repos only
  const topRepos = repos.slice(0, 5).map(repo => ({
    name: repo.name,
    description: repo.description ? repo.description.substring(0, 100) : 'No description',
    stars: repo.stars,
    language: repo.language,
    url: repo.url
  }));

  return `
GitHub Summary for ${username}:
- Total Stars: ${totalStars}
- Top Languages: ${languages}
- Total Repos: ${repos.length}

Top 5 Repositories:
${topRepos.map(r => `- ${r.name} (${r.language || 'N/A'}, ${r.stars}★): ${r.description}`).join('\n')}
`.trim();
}

/**
 * Get the SINGLE latest repository updated
 */
export async function getLatestRepo(username) {
  const repos = await fetchGitHubRepos(username);
  if (!repos || repos.length === 0) return "No GitHub data available.";

  // Repos are already sorted by updated_at DES in fetchGitHubRepos, so index 0 is latest
  const latest = repos[0];

  return `**Latest Repository:**\n\n` +
    `📂 [${latest.name}](${latest.url})\n` +
    `⭐ ${latest.stars} | 🍴 ${latest.forks} | 🔵 ${latest.language || 'N/A'}\n` +
    `📝 ${latest.description || 'No description'}\n` +
    `Last updated: ${new Date(latest.updatedAt).toLocaleDateString()} ${new Date(latest.updatedAt).toLocaleTimeString()}`;
}

/**
 * Get recent commit activity
 */
export async function getRecentCommits(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=20`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) return "Could not fetch commit history.";

    const events = await response.json();
    const pushEvents = events.filter(e => e.type === 'PushEvent');

    if (pushEvents.length === 0) return "No recent public commits found.";

    let commitLog = "**Latest Commits:**\n\n";

    // Take top 5 push events
    pushEvents.slice(0, 5).forEach(event => {
      const repoName = event.repo.name;
      const date = new Date(event.created_at).toLocaleDateString();

      // Sometime payload.commits can be undefined/null
      const commits = event.payload.commits || [];

      commits.reverse().forEach(commit => {
        commitLog += `🔹 **${repoName}** (${date})\n   "${commit.message}"\n\n`;
      });
    });

    return commitLog.substring(0, 1000); // Limit length
  } catch (error) {
    console.error('Error fetching commits:', error);
    return "Error fetching commit history.";
  }
}

export async function fetchGitHubProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        })
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }

    const profile = await response.json();

    return {
      name: profile.name,
      bio: profile.bio,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      location: profile.location,
      company: profile.company,
      blog: profile.blog,
      avatarUrl: profile.avatar_url,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export async function searchGitHubRepos(username, query) {
  try {
    const repos = await fetchGitHubRepos(username);
    const lowerQuery = query.toLowerCase();

    return repos.filter(repo =>
      repo.name.toLowerCase().includes(lowerQuery) ||
      (repo.description && repo.description.toLowerCase().includes(lowerQuery)) ||
      repo.topics.some(topic => topic.toLowerCase().includes(lowerQuery)) ||
      (repo.language && repo.language.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error('Error searching GitHub repos:', error);
    return [];
  }
}
