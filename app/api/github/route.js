import { NextResponse } from 'next/server';
import { fetchGitHubRepos, fetchGitHubProfile, searchGitHubRepos } from '@/lib/github-tools';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const username = searchParams.get('username') || 'praneeth-7606';
    const query = searchParams.get('query');

    let data;

    switch (action) {
      case 'repos':
        data = await fetchGitHubRepos(username);
        break;
      case 'profile':
        data = await fetchGitHubProfile(username);
        break;
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query parameter required for search' },
            { status: 400 }
          );
        }
        data = await searchGitHubRepos(username, query);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: repos, profile, or search' },
          { status: 400 }
        );
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
