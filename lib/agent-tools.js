// Enhanced agent tools for the AI chatbot
import personalData from '@/data/personal.json';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import { parseResumeData, searchResume } from './resume-parser';
import { fetchGitHubRepos, fetchGitHubProfile, searchGitHubRepos } from './github-tools';

export const agentTools = {
  // Personal Information
  getPersonalInfo: () => {
    return {
      ...personalData,
      resume: parseResumeData(),
    };
  },

  // Projects with filtering
  getProjects: (filters = {}) => {
    let projects = projectsData;
    
    if (filters.category) {
      projects = projects.filter(p => p.category.includes(filters.category));
    }
    
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      projects = projects.filter(p => 
        p.title.toLowerCase().includes(keyword) || 
        p.description.toLowerCase().includes(keyword) ||
        p.techStack.some(tech => tech.toLowerCase().includes(keyword))
      );
    }
    
    if (filters.technology) {
      const tech = filters.technology.toLowerCase();
      projects = projects.filter(p => 
        p.techStack.some(t => t.toLowerCase().includes(tech))
      );
    }
    
    return projects;
  },

  // Experience
  getExperience: (filters = {}) => {
    let experience = experienceData;
    
    if (filters.type) {
      experience = experience.filter(e => e.type === filters.type);
    }
    
    if (filters.company) {
      const company = filters.company.toLowerCase();
      experience = experience.filter(e => 
        e.company.toLowerCase().includes(company)
      );
    }
    
    return experience;
  },

  // Skills
  getSkills: (category = null) => {
    if (category) {
      return skillsData.filter(s => s.category === category);
    }
    return skillsData;
  },

  // Resume search
  searchResume: (query) => {
    return searchResume(query);
  },

  // GitHub integration
  getGitHubRepos: async (username = 'praneeth-7606') => {
    return await fetchGitHubRepos(username);
  },

  getGitHubProfile: async (username = 'praneeth-7606') => {
    return await fetchGitHubProfile(username);
  },

  searchGitHub: async (query, username = 'praneeth-7606') => {
    return await searchGitHubRepos(username, query);
  },

  // Combined search across all data sources
  searchAll: async (query) => {
    const results = {
      resume: searchResume(query),
      projects: agentTools.getProjects({ keyword: query }),
      experience: experienceData.filter(e => 
        JSON.stringify(e).toLowerCase().includes(query.toLowerCase())
      ),
      skills: skillsData.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
      ),
      github: await searchGitHubRepos('praneeth-7606', query),
    };
    
    return results;
  },

  // Get recommendations based on query intent
  getRecommendations: (intent) => {
    const recommendations = {
      'hire': {
        message: "Praneeth is available for freelance projects and full-time opportunities!",
        contact: personalData.email,
        availability: personalData.availability,
        strengths: [
          "Full-stack development with React, Next.js, Node.js",
          "GenAI integration with LangChain and LLMs",
          "Proven track record with hackathon wins",
          "Strong problem-solving skills (200+ DSA problems)"
        ]
      },
      'collaborate': {
        message: "Praneeth is open to collaboration on interesting projects!",
        github: personalData.socialLinks.github,
        linkedin: personalData.socialLinks.linkedin,
        interests: ["GenAI applications", "Full-stack web apps", "Open source"]
      },
      'learn': {
        message: "Check out Praneeth's projects to learn from his work!",
        projects: projectsData.slice(0, 3),
        github: personalData.socialLinks.github,
      }
    };
    
    return recommendations[intent] || null;
  },

  // Get education information
  getEducation: () => {
    return personalData.education;
  },

  // Get contact information
  getContactInfo: () => {
    return {
      email: personalData.email,
      alternateEmail: personalData.alternateEmail,
      phone: personalData.phone,
      location: personalData.location,
      linkedin: personalData.socialLinks.linkedin,
      github: personalData.socialLinks.github,
      portfolio: personalData.socialLinks.portfolio,
    };
  },

  // Get skills grouped by category
  getSkillsByCategory: () => {
    return skillsData.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push({
        name: skill.name,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
      });
      return acc;
    }, {});
  },

  // Get specific project by ID or name
  getProjectByName: (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return projectsData.find(p => 
      p.title.toLowerCase().includes(term) ||
      p.id.toLowerCase().includes(term)
    );
  },

  // Get services/offerings
  getServices: () => {
    return [
      {
        title: "Full-Stack Development",
        description: "Building scalable web applications with React, Next.js, Node.js, and modern databases",
        technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"]
      },
      {
        title: "GenAI Integration",
        description: "Implementing LLM-powered features, RAG systems, and AI chatbots",
        technologies: ["LangChain", "Mistral AI", "OpenAI", "RAG", "Vector Databases"]
      },
      {
        title: "API Development",
        description: "Creating robust RESTful APIs with FastAPI and Express.js",
        technologies: ["FastAPI", "Express.js", "JWT", "Swagger"]
      },
      {
        title: "Cloud Solutions",
        description: "Deploying and managing applications on AWS and other cloud platforms",
        technologies: ["AWS", "Docker", "Nginx"]
      }
    ];
  },
};
