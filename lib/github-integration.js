// GitHub Integration for Portfolio
// Fetches real-time data from GitHub using MCP connection

/**
 * Fetch all repositories for a GitHub user
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of repository objects
 */
export async function fetchGitHubRepos(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Transform and filter repos
    return repos
      .filter(repo => !repo.fork) // Exclude forked repos
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description available',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        language: repo.language,
        url: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        size: repo.size,
        openIssues: repo.open_issues_count,
        isPrivate: repo.private,
        defaultBranch: repo.default_branch
      }))
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by most recent
  } catch (error) {
    console.error('GitHub repos fetch error:', error);
    return [];
  }
}

/**
 * Fetch detailed information about a specific repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise<Object|null>} Repository details object
 */
export async function fetchRepoDetails(username, repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repo = await response.json();
    
    return {
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics,
      url: repo.html_url,
      homepage: repo.homepage,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      license: repo.license?.name,
      size: repo.size,
      openIssues: repo.open_issues_count
    };
  } catch (error) {
    console.error('Repo details fetch error:', error);
    return null;
  }
}

/**
 * Fetch recent commits for a repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @param {number} limit - Number of commits to fetch (default: 10)
 * @returns {Promise<Array>} Array of commit objects
 */
export async function fetchRepoCommits(username, repoName, limit = 10) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/commits?per_page=${limit}`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 1800 } // Cache for 30 minutes
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const commits = await response.json();
    
    return commits.map(commit => ({
      message: commit.commit.message,
      author: commit.commit.author.name,
      email: commit.commit.author.email,
      date: commit.commit.author.date,
      sha: commit.sha.substring(0, 7),
      url: commit.html_url
    }));
  } catch (error) {
    console.error('Commits fetch error:', error);
    return [];
  }
}

/**
 * Fetch GitHub user profile information
 * @param {string} username - GitHub username
 * @returns {Promise<Object|null>} User profile object
 */
export async function fetchGitHubProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const user = await response.json();
    
    return {
      name: user.name,
      bio: user.bio,
      location: user.location,
      email: user.email,
      blog: user.blog,
      company: user.company,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      createdAt: user.created_at
    };
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
}

/**
 * Fetch repository languages
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name
 * @returns {Promise<Object>} Languages object with byte counts
 */
export async function fetchRepoLanguages(username, repoName) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/languages`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 86400 }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Languages fetch error:', error);
    return {};
  }
}

/**
 * Search repositories by topic or keyword
 * @param {string} username - GitHub username
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching repositories
 */
export async function searchUserRepos(username, query) {
  try {
    const allRepos = await fetchGitHubRepos(username);
    
    const searchLower = query.toLowerCase();
    
    return allRepos.filter(repo => 
      repo.name.toLowerCase().includes(searchLower) ||
      repo.description.toLowerCase().includes(searchLower) ||
      repo.topics.some(topic => topic.toLowerCase().includes(searchLower)) ||
      (repo.language && repo.language.toLowerCase().includes(searchLower))
    );
  } catch (error) {
    console.error('Search repos error:', error);
    return [];
  }
}

/**
 * Get repository statistics
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Statistics object
 */
export async function getGitHubStats(username) {
  try {
    const repos = await fetchGitHubRepos(username);
    const profile = await fetchGitHubProfile(username);
    
    const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
    const languages = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));
    
    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      topLanguages,
      followers: profile?.followers || 0,
      following: profile?.following || 0
    };
  } catch (error) {
    console.error('Stats fetch error:', error);
    return null;
  }
}
