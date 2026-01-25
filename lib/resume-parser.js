// Resume parser utility
// This can be enhanced to parse PDF/DOCX resumes

export function parseResumeData() {
  // For now, we'll structure the existing data as a resume format
  // This can be enhanced to parse actual PDF/DOCX files
  
  const resumeData = {
    personalInfo: {
      name: "Praneeth Vedagiri",
      title: "Full-Stack Developer & GenAI Specialist",
      email: "praneethvvsss@gmail.com",
      phone: "+916303087606",
      location: "Ongole, Andhra Pradesh, India",
      linkedin: "https://www.linkedin.com/in/praneeth-vedagiri",
      github: "https://github.com/praneeth-7606",
    },
    
    summary: `Passionate full-stack developer pursuing B.Tech in Computer Science and Engineering (AI) at Amrita Vishwa Vidyapeetham. Specializing in React.js, Next.js, Node.js, MongoDB, TypeScript, and GenAI technologies. Successfully delivered projects including e-commerce platforms, job portals, and cutting-edge GenAI solutions. Won 1st prize in hackathon for Resume Automation tool. Focused on creating user-centric, high-performance applications that bridge technology with real-world needs.`,
    
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering (AI)",
        institution: "Amrita Vishwa Vidyapeetham",
        duration: "2021 - 2025",
        location: "India",
      }
    ],
    
    experience: [
      {
        title: "Associate Software Engineer Intern",
        company: "Connected Value Health Solutions",
        duration: "Jan 2025 - Present",
        achievements: [
          "Won 1st prize in internal hackathon with Resume Automation tool",
          "Developed AI-powered medical chatbot using Mistral AI and LangChain",
          "Implemented RAG architecture with FAISS for efficient vector search",
          "Built Resume Automation system with 90% user satisfaction rate",
        ]
      },
      {
        title: "Pro Coder and Developer",
        company: "Self-Employed",
        duration: "Jan 2024 - Dec 2024",
        achievements: [
          "Developed 5+ full-stack applications using Next.js and TypeScript",
          "Solved 200+ DSA problems on LeetCode",
          "Built e-commerce platform with Stripe payment integration",
          "Created job portal with role-based access control",
        ]
      },
      {
        title: "React.js Developer Intern",
        company: "Amrita Center for Wireless Networks and Applications",
        duration: "Jan 2023 - Sept 2023",
        achievements: [
          "Developed responsive web applications using React.js",
          "Improved application performance by 30% through optimization",
          "Implemented seamless backend integration with RESTful APIs",
        ]
      }
    ],
    
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
      frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Material-UI"],
      backend: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
      databases: ["MongoDB", "Firebase", "MySQL"],
      ai_ml: ["LangChain", "Mistral AI", "OpenAI", "RAG", "FAISS", "Vector Databases"],
      tools: ["Git", "GitHub", "VS Code", "Postman", "npm", "Docker"],
      other: ["JWT Authentication", "Stripe Integration", "Email.js", "Responsive Design"]
    },
    
    projects: [
      {
        name: "AI-Powered Medical Chatbot",
        description: "AI-driven chatbot providing medication recommendations using Mistral AI, LangChain, and RAG",
        technologies: ["React.js", "Mistral AI", "LangChain", "FastAPI", "FAISS", "Firebase"],
        achievements: ["94% accuracy", "<2s response time", "4.7/5 user satisfaction"]
      },
      {
        name: "Resume Automation System",
        description: "AI-powered system for generating resumes and cover letters from templates",
        technologies: ["React.js", "FastAPI", "MongoDB", "Mistral AI"],
        achievements: ["Won 1st prize in hackathon", "90% user satisfaction"]
      },
      {
        name: "Online Job Portal",
        description: "Comprehensive job portal with authentication, role-based access, and application tracking",
        technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
        achievements: ["1000+ job listings", "500+ active users"]
      },
      {
        name: "E-Commerce Website",
        description: "Full-featured e-commerce platform with cart, payments, and admin panel",
        technologies: ["React.js", "Firebase", "Stripe API"],
        achievements: ["99.9% uptime", "98% payment success rate"]
      }
    ],
    
    certifications: [
      "Full-Stack Web Development",
      "React.js Advanced Concepts",
      "Node.js Backend Development",
      "GenAI and LLM Applications"
    ],
    
    achievements: [
      "Won 1st prize in internal hackathon for Resume Automation tool",
      "Solved 200+ DSA problems on LeetCode",
      "Built 5+ production-ready full-stack applications",
      "Contributed to open-source projects"
    ]
  };
  
  return resumeData;
}

export function searchResume(query) {
  const resume = parseResumeData();
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  // Search in all sections
  const searchableText = JSON.stringify(resume).toLowerCase();
  
  if (searchableText.includes(lowerQuery)) {
    // Find relevant sections
    if (JSON.stringify(resume.skills).toLowerCase().includes(lowerQuery)) {
      results.push({ section: 'skills', data: resume.skills });
    }
    if (JSON.stringify(resume.experience).toLowerCase().includes(lowerQuery)) {
      results.push({ section: 'experience', data: resume.experience });
    }
    if (JSON.stringify(resume.projects).toLowerCase().includes(lowerQuery)) {
      results.push({ section: 'projects', data: resume.projects });
    }
  }
  
  return results.length > 0 ? results : resume;
}
