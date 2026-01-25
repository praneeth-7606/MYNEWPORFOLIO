// GitHub API integration for fetching repository data
// This can be enhanced with MCP connection later

export async function fetchGitHubRepos(username) {
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

    const repos = await response.json();
    
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
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
