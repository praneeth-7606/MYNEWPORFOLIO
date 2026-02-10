// Type definitions for portfolio data

export interface PersonalData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: 'available' | 'limited' | 'booked';
  responseTime: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook?: string;
    instagram?: string;
    leetcode?: string;
    stackoverflow?: string;
  };
  resume: string;
  profile: string;
}

export type ProjectCategory = 'fullstack' | 'genai' | 'ecommerce' | 'api' | 'mobile';

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  techStack: string[];
  features: string[];
  challenges?: string;
  solutions?: string;
  results?: string;
  metrics?: ProjectMetric[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  demoType?: 'live' | 'video' | 'images';
  architecture?: string;
  aiPipeline?: {
    llmProvider: string;
    vectorDb?: string;
    framework?: string;
    apis: string[];
  };
}

export type SkillCategory = 'frontend' | 'backend' | 'ai-ml' | 'devops' | 'database' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  yearsOfExperience: number;
  projectsCompleted?: number;
  icon: string;
}

export type ExperienceType = 'fulltime' | 'internship' | 'freelance' | 'contract';

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location?: string;
  duration: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: ExperienceType;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  projectType: string;
  feedback: string;
  rating: number;
  date: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  startingPrice?: string;
  estimatedDuration: string;
  icon: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  gpa?: string;
}
