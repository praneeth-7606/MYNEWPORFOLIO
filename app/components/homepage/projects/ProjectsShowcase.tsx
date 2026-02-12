'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Zap, Award, TrendingUp, Database, Cloud } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { Project } from '@/data/types';

const categories = [
  { id: 'all', label: 'All Projects', icon: Sparkles },
  { id: 'genai', label: 'GenAI & LLM', icon: Zap },
  { id: 'fullstack', label: 'Full-Stack', icon: Database },
  { id: 'api', label: 'API & Backend', icon: Cloud },
];

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsData as Project[]
    : (projectsData as Project[]).filter((project: Project) =>
      project.category.includes(selectedCategory as any)
    );

  const getProjectIcon = (project: Project) => {
    if (project.award) return Award;
    if (project.category.includes('genai')) return Zap;
    if (project.category.includes('fullstack')) return Database;
    return TrendingUp;
  };

  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
              Portfolio Showcase
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Production-grade AI systems and full-stack applications built with cutting-edge technologies
          </p>
        </motion.div>

        {/* Category Filter - Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white shadow-2xl shadow-purple-500/50 scale-105'
                    : 'bg-[#0a0d37] border border-[#1b2c68a0] text-gray-300 hover:border-purple-500/50 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} className={selectedCategory === category.id ? 'animate-pulse' : ''} />
                  <span>{category.label}</span>
                </div>
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Showcase - Unique Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, index: number) => {
              const ProjectIcon = getProjectIcon(project);
              const isHovered = hoveredProject === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                  {/* Card */}
                  <div className="relative h-full bg-[#0a0d37] border border-[#1b2c68a0] rounded-3xl p-8 overflow-hidden group-hover:border-purple-500/50 transition-all duration-500">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <ProjectIcon size={28} className="text-white" />
                        </div>

                        {project.award && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1"
                          >
                            <Award size={12} />
                            <span>Winner</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 mb-6">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {project.metrics.slice(0, 3).map((metric, idx) => (
                            <div key={idx} className="bg-[#1b2c68a0] rounded-xl p-3 text-center">
                              <p className="text-cyan-400 font-bold text-sm">{metric.value}</p>
                              <p className="text-gray-500 text-xs mt-1">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#1b2c68a0] rounded-xl text-gray-300 hover:bg-[#1b2c68] hover:text-white transition-all duration-300 group/btn"
                          >
                            <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
                            <span className="text-sm font-medium">Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group/btn"
                          >
                            <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            <span className="text-sm font-medium">Live</span>
                          </a>
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent pointer-events-none"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-white" />
            </div>
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
