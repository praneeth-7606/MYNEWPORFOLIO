import ayla from '/public/image/ayla.jpg';
import crefin from '/public/image/crefin.jpg';
import realEstate from '/public/image/real-estate.jpg';
import travel from '/public/image/travel.jpg';
import contactimage from '/public/png/placeholder.png';
export const projectsData = [
    {
        "id": 1,
        "name": "AI-Powered Medical Chatbot",
        "description": "Developed an AI-driven chatbot that provides primary medication recommendations based on user input. The system combines Mistral AI with LangChain and Retrieval-Augmented Generation (RAG) for accurate, context-aware responses.",
        "features": [
          "Provides AI-based medical recommendations through conversational interface.",
          "Integrated Mistral AI with LangChain and RAG for context-aware responses.",
          "Built secure FastAPI backend with FAISS for fast vector-based search.",
          "Implemented Firebase Authentication for secure login and document uploads."
        ],
        "tools": ["React.js", "Mistral AI", "LangChain", "FastAPI", "FAISS", "Firebase"],
        "role": "Full Stack Developer",
        "code": "",
        "demo": "",
        "image": ""
    },
    {
        
        "id": 2,
        "name": "Resume Automation System",
        "description": "Built an AI-powered system for generating resumes and cover letters from user-selected templates. The system parses user-uploaded resumes, cover letters, and skill matrices to enhance content using LLMs.",
        "features": [
          "Generates resumes and cover letters using AI-enhanced templates.",
          "Parses uploaded resumes, cover letters, and skill matrices intelligently.",
          "Integrated Mistral Model API for LLM-based content generation.",
          "Secure authentication with login, signup, and password recovery."
        ],
        "tools": ["React.js", "FastAPI", "MongoDB", "Mistral AI"],
        "role": "Full Stack Developer",
        "code": "",
        "demo": "",
        "image": ""
      
    },
    {
        id: 3,
        name: 'Online Job Portal',
        description: "Developed a job portal web application using the MERN stack, featuring user authentication, role-based access control, job listings,job manipulation, and resume uploading. Enhanced UX/UI with React Js, CSS,ThunderClient, Materia UI and React-Bootstrap.",
        tools: ['MongoDB', 'Express', 'React.js', 'Node.js', 'Bootstrap', 'CSS'],
        role: 'MERN Stack Developer',
        code: '',
        demo: '',
        image: crefin,
    },
    {
        id: 4,
        name: 'E-Commerce Website',
        description: "Built a complete e-commerce website featuring product listings, shopping cart functionality, payment integration, and admin panel for inventory management. Designed using React.js and integrated with Firebase for authentication.",
        tools: ['React.js', 'Firebase', 'CSS', 'Stripe API', 'React Router', 'Bootstrap'],
        role: 'MERN Stack Developer',
        code: '',
        demo: '',
        image: travel,
    },     
    {
        
            
    id: 5,
    name: 'Contact Management App',
    description: "Built a robust backend for a contact management application using Express and Node.js. Implemented RESTful APIs for managing contacts, including features for creating, updating, deleting, and retrieving contacts. Focused on efficient data handling and secure user authentication, providing a reliable and scalable solution.",
    tools: ['Node.js', 'Express', 'MongoDB', 'JWT Authentication'],
    role: 'Backend Developer',
    code: '',  // Add GitHub repo link here if available
    demo: '',  // Add live demo link here if available
    image: contactimage,  // Ensure 'contactImage' points to the correct image file path
            
            
    }

];
