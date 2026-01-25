/**
 * Script to seed Pinecone with portfolio data
 * Run: node scripts/seed-vectors.js
 */

import { getOrCreateIndex } from '../lib/pinecone-client.js';
import { generateEmbedding } from '../lib/embeddings.js';
import personalData from '../data/personal.json' assert { type: 'json' };
import projectsData from '../data/projects.json' assert { type: 'json' };
import experienceData from '../data/experience.json' assert { type: 'json' };
import skillsData from '../data/skills.json' assert { type: 'json' };

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

    // 4. Skills
    console.log('🛠️  Processing skills...');
    const skillsText = `
      Technical Skills:
      Frontend: ${skillsData.frontend?.join(', ') || ''}
      Backend: ${skillsData.backend?.join(', ') || ''}
      Database: ${skillsData.database?.join(', ') || ''}
      AI/ML: ${skillsData.aiml?.join(', ') || ''}
      Tools: ${skillsData.tools?.join(', ') || ''}
      Languages: ${skillsData.languages?.join(', ') || ''}
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
