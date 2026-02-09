const fs = require('fs');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const USERNAME = 'praneeth-7606';
const CACHE_FILE = path.join(__dirname, '../data/github-cache.json');

async function fetchGitHubData(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': `${USERNAME}-portfolio`,
                'Accept': 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${data}`);
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function syncGitHub() {
    console.log('🔄 SYNC: Starting GitHub Data Sync...');

    try {
        // 1. Fetch Profile
        console.log('👤 Fetching Profile...');
        const profile = await fetchGitHubData(`https://api.github.com/users/${USERNAME}`);

        // 2. Fetch Repos (All)
        console.log('📦 Fetching Repositories...');
        const repos = await fetchGitHubData(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);

        console.log(`✅ Found ${repos.length} repositories.`);

        // 3. Optimize Data Payload
        const optimizedData = {
            lastUpdated: new Date().toISOString(),
            profile: {
                login: profile.login,
                avatar_url: profile.avatar_url,
                html_url: profile.html_url,
                public_repos: profile.public_repos,
                followers: profile.followers,
                bio: profile.bio
            },
            stats: {
                totalStars: repos.reduce((acc, r) => acc + r.stargazers_count, 0),
                topLanguages: [...new Set(repos.map(r => r.language).filter(Boolean))].slice(0, 5)
            },
            repos: repos.map(r => ({
                name: r.name,
                full_name: r.full_name,
                description: r.description,
                url: r.html_url,
                stars: r.stargazers_count,
                forks: r.forks_count,
                language: r.language,
                topics: r.topics || [],
                updatedAt: r.updated_at,
                license: r.license ? r.license.spdx_id : null
            }))
        };

        // 4. Save to Disk
        fs.writeFileSync(CACHE_FILE, JSON.stringify(optimizedData, null, 2));
        console.log(`💾 SAVED: Data synced to ${CACHE_FILE}`);
        console.log('✅ SYNC: Complete! Your agent will now use this ultra-fast data.');

    } catch (error) {
        console.error('❌ SYNC FAILED:', error.message);
        process.exit(1);
    }
}

syncGitHub();
