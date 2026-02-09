/**
 * Script to seed Pinecone with portfolio data
 * Run: node --env-file=.env.local scripts/seed-vectors.js
 */

import { getOrCreateIndex } from '../lib/pinecone-client.js';
import { generateEmbedding } from '../lib/embeddings.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Verify environment variables
if (!process.env.PINECONE_API_KEY) {
  console.error('❌ PINECONE_API_KEY not found in environment');
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment');
  process.exit(1);
}

console.log('✅ Environment variables loaded');

// Load JSON data
const personalData = JSON.parse(readFileSync(join(__dirname, '../data/personal.json'), 'utf-8'));
const projectsData = JSON.parse(readFileSync(join(__dirname, '../data/projects.json'), 'utf-8'));
const experienceData = JSON.parse(readFileSync(join(__dirname, '../data/experience.json'), 'utf-8'));
const skillsData = JSON.parse(readFileSync(join(__dirname, '../data/skills.json'), 'utf-8'));

async function seedVectors() {
  console.log('🚀 Starting vector seeding...\n');

  try {
    const index = await getOrCreateIndex();
    const vectors = [];

    // 1. Personal Information
    console.log('📝 Processing personal information...');
    const personalText = `
      Name: ${personalData.name}
      Title: ${personalData.title}
      Bio: ${personalData.bio}
      Email: ${personalData.email}
      Location: ${personalData.location}
      Tagline: ${personalData.tagline}
    `;
    const personalEmbedding = await generateEmbedding(personalText);
    vectors.push({
      id: 'personal-info',
      values: personalEmbedding,
      metadata: {
        type: 'personal',
        content: personalText,
        data: JSON.stringify(personalData)
      }
    });

    // 2. Projects
    console.log('📦 Processing projects...');
    for (const project of projectsData) {
      const projectText = `
        Project: ${project.title}
        Description: ${project.description}
        Category: ${project.category.join(', ')}
        Tech Stack: ${project.techStack.join(', ')}
        ${project.features ? 'Features: ' + project.features.join(', ') : ''}
        ${project.highlights ? 'Highlights: ' + project.highlights.join(', ') : ''}
      `;
      const embedding = await generateEmbedding(projectText);
      vectors.push({
        id: `project-${project.id}`,
        values: embedding,
        metadata: {
          type: 'project',
          title: project.title,
          category: project.category.join(', '),
          content: projectText,
          data: JSON.stringify(project)
        }
      });
    }

    // 3. Experience
    console.log('💼 Processing experience...');
    for (let i = 0; i < experienceData.length; i++) {
      const exp = experienceData[i];
      const expText = `
        Position: ${exp.position}
        Company: ${exp.company}
        Duration: ${exp.duration}
        Description: ${exp.description}
        ${exp.achievements ? 'Achievements: ' + exp.achievements.join(', ') : ''}
      `;
      const embedding = await generateEmbedding(expText);
      vectors.push({
        id: `experience-${i}`,
        values: embedding,
        metadata: {
          type: 'experience',
          position: exp.position,
          company: exp.company,
          content: expText,
          data: JSON.stringify(exp)
        }
      });
    }

    // 4. Skills - Group by category
    console.log('🛠️  Processing skills...');
    const skillsByCategory = skillsData.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {});
    
    const skillsText = `
      Technical Skills:
      Frontend: ${skillsByCategory.frontend?.join(', ') || ''}
      Backend: ${skillsByCategory.backend?.join(', ') || ''}
      Database: ${skillsByCategory.database?.join(', ') || ''}
      AI/ML: ${skillsByCategory['ai-ml']?.join(', ') || ''}
      Tools: ${skillsByCategory.tools?.join(', ') || ''}
      DevOps: ${skillsByCategory.devops?.join(', ') || ''}
      
      All Skills: ${skillsData.map(s => s.name).join(', ')}
    `;
    const skillsEmbedding = await generateEmbedding(skillsText);
    vectors.push({
      id: 'skills-all',
      values: skillsEmbedding,
      metadata: {
        type: 'skills',
        content: skillsText,
        data: JSON.stringify(skillsData)
      }
    });

    // Upload vectors to Pinecone
    console.log(`\n📤 Uploading ${vectors.length} vectors to Pinecone...`);
    await index.upsert(vectors);

    console.log('✅ Vector seeding completed successfully!\n');
    console.log(`Total vectors uploaded: ${vectors.length}`);
    console.log('- Personal info: 1');
    console.log(`- Projects: ${projectsData.length}`);
    console.log(`- Experience: ${experienceData.length}`);
    console.log('- Skills: 1');

  } catch (error) {
    console.error('❌ Error seeding vectors:', error);
    process.exit(1);
  }
}

// Run the seeding
seedVectors();
