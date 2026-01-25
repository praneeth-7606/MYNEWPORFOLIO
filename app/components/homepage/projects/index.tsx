'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/data/projects.json';
import ProjectCard from './ProjectCard';
import { Project } from '@/data/types';

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'genai', label: 'GenAI & LLM' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'api', label: 'API & Backend' },
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((project: Project) => 
        project.category.includes(selectedCategory as any)
      );

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing my expertise in full-stack development and GenAI integrations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-white shadow-lg scale-105'
                  : 'bg-[#1b2c68a0] text-gray-300 hover:bg-[#1b2c68] hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

// Project Detail Modal Component
function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0d37] border border-[#1b2c68a0] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0a0d37] border-b border-[#1b2c68a0] p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-[#16f2b3] mb-2">Overview</h4>
            <p className="text-gray-300">{project.longDescription}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold text-[#16f2b3] mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#1b2c68a0] text-sm text-gray-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-[#16f2b3] mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-[#16f2b3] mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Pipeline (for GenAI projects) */}
          {project.aiPipeline && (
            <div>
              <h4 className="text-lg font-semibold text-[#16f2b3] mb-3">AI Architecture</h4>
              <div className="bg-[#1b2c68a0] rounded-lg p-4 space-y-2">
                <p className="text-gray-300">
                  <span className="font-semibold">LLM Provider:</span> {project.aiPipeline.llmProvider}
                </p>
                {project.aiPipeline.vectorDb && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Vector Database:</span> {project.aiPipeline.vectorDb}
                  </p>
                )}
                {project.aiPipeline.framework && (
                  <p className="text-gray-300">
                    <span className="font-semibold">Framework:</span> {project.aiPipeline.framework}
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="font-semibold">APIs:</span> {project.aiPipeline.apis.join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-[#16f2b3] mb-3">Results & Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="bg-[#1b2c68a0] rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-[#16f2b3]">{metric.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1b2c68a0] rounded-full text-white font-semibold hover:bg-[#1b2c68] transition-all"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
