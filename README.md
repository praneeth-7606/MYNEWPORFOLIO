# 🚀 AI-Powered Developer Portfolio

A modern, interactive portfolio website built with Next.js, featuring an intelligent AI chatbot powered by Google Gemini, RAG (Retrieval-Augmented Generation), and GitHub MCP integration.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🤖 **Intelligent AI Assistant**
- **Context-Aware Chatbot** powered by Google Gemini 2.0 Flash
- **RAG Integration** with Pinecone for accurate portfolio information retrieval
- **GitHub MCP Integration** for real-time repository data
- **Smart Query Routing** - automatically routes queries to optimal data sources
- **Zero-Token Optimization** for common queries (skills, experience, education)

### 🎨 **Modern UI/UX**
- **Stunning Animations** with Framer Motion
- **3D Graphics** using Three.js and React Three Fiber
- **Responsive Design** - works seamlessly on all devices
- **Dark/Light Mode** support
- **Interactive Component Showcase**

### 📊 **Dynamic Content**
- **Project Showcase** with filtering and search
- **Skills Visualization** with proficiency levels
- **Work Experience Timeline**
- **Freelancing Portfolio**
- **Blog Integration** (Dev.to)

### 🔧 **Developer Experience**
- **TypeScript** for type safety
- **ESLint** configuration
- **Hot Module Replacement**
- **Optimized Build** with Next.js 14

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (App Router)
- **UI Library:** React 18.2
- **Styling:** Tailwind CSS, SASS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Icons:** Lucide React, React Icons

### AI & Backend
- **LLM:** Google Gemini 2.0 Flash (via LangChain)
- **Vector Database:** Pinecone
- **RAG Framework:** LangChain
- **GitHub Integration:** Model Context Protocol (MCP)
- **Email Service:** EmailJS

### Development
- **Language:** TypeScript, JavaScript
- **Package Manager:** npm
- **Linting:** ESLint
- **Build Tool:** Next.js/Webpack

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key
- GitHub Personal Access Token (for MCP)
- Pinecone API key (optional, for RAG)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praneeth-7606/MYNEWPORFOLIO.git
   cd MYNEWPORFOLIO
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key_here
   PORTFOLIO_GEMINI_KEY=your_gemini_api_key_here
   
   # GitHub Integration (for MCP)
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_PERSONAL_ACCESS_TOKEN=your_github_personal_access_token
   
   # Pinecone (for RAG)
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_index_name
   PINECONE_ENVIRONMENT=your_environment
   
   # EmailJS (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   
   # Google reCAPTCHA (optional)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy on Render (Recommended for Full MCP Support)

Render Web Service supports MCP because it runs in a persistent container.

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Build Command:** `npm install --legacy-peer-deps; npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
   - **Instance Type:** Free or paid tier

3. **Add Environment Variables**
   - Add all variables from `.env.local` in Render dashboard

4. **Deploy**
   - Click "Create Web Service"
   - MCP will work perfectly! ✅

### Deploy on Vercel (Note: MCP Disabled)

Vercel's serverless architecture doesn't support MCP subprocess spawning. GitHub queries will use fallback messages.

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chatbot endpoint
│   │   ├── contact/              # Contact form endpoint
│   │   └── github/               # GitHub data endpoint
│   ├── components/               # React components
│   │   ├── homepage/             # Homepage sections
│   │   │   ├── hero-section/     # Hero section with 3D animations
│   │   │   ├── projects/         # Projects showcase
│   │   │   ├── skills/           # Skills visualization
│   │   │   ├── experience/       # Work experience timeline
│   │   │   └── freelancing/      # Freelancing portfolio
│   │   └── helper/               # Utility components
│   ├── freelancing/              # Freelancing page
│   └── layout.tsx                # Root layout
├── lib/                          # Core libraries
│   ├── unified-agent.js          # AI agent orchestration
│   ├── rag.js                    # RAG implementation
│   ├── mcp-client.js             # MCP GitHub client
│   ├── github-mcp-tools.js       # GitHub MCP tools
│   └── agent-tools.js            # Direct data access tools
├── data/                         # JSON data files
│   ├── personal.json             # Personal information
│   ├── projects.json             # Projects data
│   ├── skills.json               # Skills data
│   ├── experience.json           # Work experience
│   ├── education.json            # Education data
│   └── freelancing-work.json     # Freelancing projects
├── public/                       # Static assets
├── styles/                       # Global styles
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── package.json                  # Dependencies

```

## 🤖 AI Chatbot Architecture

### Smart Query Routing

The chatbot uses intelligent routing to optimize token usage:

1. **GitHub Queries** → MCP Flow (real-time GitHub API)
2. **Simple Data Queries** → Direct Data (zero tokens)
3. **Complex Reasoning** → RAG + LLM (minimal tokens)
4. **Fallback** → Minimal RAG + LLM

### Zero-Token Optimization

Common queries bypass the LLM entirely:
- Skills queries
- Experience queries
- Education queries
- Contact information
- Project listings

### RAG Pipeline

1. User query → Pinecone vector search
2. Retrieve top-k relevant documents
3. Build context from retrieved docs
4. LLM generates response with context

## 🔑 Key Features Explained

### 📊 **Projects Showcase**
- Dynamic filtering by category
- Featured vs. other projects separation
- Award badges for winning projects
- Technology stack display
- Live demo and GitHub links

### 💼 **Freelancing Portfolio**
- Dedicated page for freelance work
- Client testimonials
- Project metrics and tech stacks
- Category-based filtering

### 🎯 **Skills Section**
- Proficiency visualization
- Years of experience tracking
- Projects completed counter
- Category-based grouping (Frontend, Backend, AI/ML, etc.)

### 📧 **Contact Form**
- Email integration via EmailJS
- reCAPTCHA protection
- Form validation with React Hook Form
- Toast notifications

## 📝 Customization

### Update Personal Information

Edit the JSON files in the `data/` directory:

- `data/personal.json` - Name, bio, contact info
- `data/projects.json` - Project details
- `data/skills.json` - Skills and proficiency
- `data/experience.json` - Work history
- `data/education.json` - Education details
- `data/freelancing-work.json` - Freelance projects

### Modify Styling

- **Global styles:** `app/globals.css`
- **Tailwind config:** `tailwind.config.js`
- **Component styles:** Inline Tailwind classes or SASS modules

### Customize AI Behavior

- **Routing logic:** `lib/unified-agent.js`
- **RAG settings:** `lib/rag.js`
- **MCP tools:** `lib/github-mcp-tools.js`

## 🐛 Troubleshooting

### MCP Not Working in Production

If deployed on Vercel, MCP is disabled due to serverless limitations. Deploy on Render Web Service for full MCP support.

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### ESLint Errors During Build

ESLint is set to ignore during builds in `next.config.js`. If you encounter issues:
```javascript
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Praneeth Vedagiri**
- GitHub: [@praneeth-7606](https://github.com/praneeth-7606)
- Email: praneethvvsss@gmail.com
- LinkedIn: [Praneeth Vedagiri](https://www.linkedin.com/in/praneeth-vedagiri-2a6603233/)

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- LangChain for RAG framework
- Model Context Protocol for GitHub integration
- Next.js team for the amazing framework
- All open-source contributors

---

**Made with ❤️ and cutting-edge AI technology**