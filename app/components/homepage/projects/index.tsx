'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Github, Database, Brain, FileText, Award, TrendingUp, Code, Sparkles, Zap, ArrowRight } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { Project } from '@/data/types';
import { useInViewportFlag } from '@/app/components/helper/use-in-viewport';

// Pulled out of the initial bundle: nothing renders it until a card is clicked.
const ProjectDetailModal = dynamic(() => import('./ProjectDetailModal'), { ssr: false });

const categories = [
  { id: 'all', label: 'All Projects', icon: Sparkles },
  { id: 'genai', label: 'GenAI & LLM', icon: Brain },
  { id: 'fullstack', label: 'Full-Stack', icon: Code },
  { id: 'api', label: 'API & Backend', icon: Database },
];

const gradients = [
  'from-purple-500 via-pink-500 to-red-500',
  'from-cyan-500 via-blue-500 to-purple-500',
  'from-green-500 via-teal-500 to-cyan-500',
  'from-orange-500 via-red-500 to-pink-500',
  'from-blue-500 via-purple-500 to-pink-500',
  'from-teal-500 via-green-500 to-emerald-500',
  'from-pink-500 via-purple-500 to-indigo-500',
  'from-yellow-500 via-orange-500 to-red-500',
];

// Pure lookups — hoisted so they aren't reallocated on every render.
const getProjectIcon = (project: Project) => {
  if (project.id === 'ebv-system') return Database;
  if (project.id === 'bank-statement-analyzer') return TrendingUp;
  if (project.id === 'scribex-medical') return FileText;
  if (project.id === 'resume-automation') return Award;
  if (project.category.includes('genai')) return Brain;
  return Code;
};

const getProjectGradient = (index: number) => gradients[index % gradients.length];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Parks this section's decorative CSS animations while it is off-screen.
  const sectionRef = useInViewportFlag<HTMLElement>();

  // Keyed on the category alone: without this, opening the detail modal re-ran the
  // filter and produced fresh array identities for every card below.
  const { featuredProjects, otherProjects, totalCount } = useMemo(() => {
    const filtered = (selectedCategory === 'all'
      ? projectsData
      : (projectsData as Project[]).filter((project) =>
        project.category.includes(selectedCategory as any)
      )) as Project[];

    return {
      // First 4 are featured (priority projects)
      featuredProjects: filtered.slice(0, 4),
      otherProjects: filtered.slice(4),
      totalCount: filtered.length,
    };
  }, [selectedCategory]);

  const handleSelectProject = useCallback((project: Project) => setSelectedProject(project), []);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium flex items-center gap-2">
              <Sparkles size={16} />
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

        {/* Category Filter */}
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
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                    ? 'text-white'
                    : 'bg-[#0a0d37] border border-[#1b2c68a0] text-gray-300 hover:border-purple-500/50 hover:text-white'
                  }`}
              >
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center gap-2">
                  <Icon size={18} />
                  <span>{category.label}</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Featured Projects - Large Cards */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Zap className="text-purple-400" size={28} />
              <h3 className="text-3xl font-bold text-white">Priority Projects</h3>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects - Compact Grid */}
        {otherProjects.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Code className="text-cyan-400" size={24} />
              <h3 className="text-2xl font-bold text-white">More Projects</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProjects.map((project, index) => (
                <CompactProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {totalCount === 0 && (
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

      {/* Project Detail Modal. Deliberately not wrapped in AnimatePresence: the
          modal's exit variants never ran here, and wrapping it left the backdrop
          stuck in the DOM at opacity 0 after close, swallowing every later click. */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}

// Extracted + memoized: opening the detail modal re-renders ProjectsSection, and
// without memo that repainted every card's framer-motion subtree for nothing.
const FeaturedProjectCard = memo(function FeaturedProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const ProjectIcon = getProjectIcon(project);
  const gradient = getProjectGradient(index);

  return (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Mega Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

                    {/* Card */}
                    <div className="relative h-full bg-gradient-to-br from-[#0a0d37] to-[#1a1f4a] rounded-3xl p-8 border border-[#1b2c68a0] hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-2xl`}
                          >
                            <ProjectIcon size={32} className="text-white" />
                          </motion.div>

                          {project.award && (
                            <div className="anim-badge-pulse px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                              <Award size={14} />
                              Winner
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 bg-gradient-to-r ${gradient} bg-opacity-10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="px-3 py-1 bg-gray-500/10 border border-gray-500/20 rounded-full text-gray-400 text-xs font-medium">
                              +{project.techStack.length - 5} more
                            </span>
                          )}
                        </div>

                        {/* Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-3">
                            {project.metrics.slice(0, 3).map((metric, idx) => (
                              <div key={idx} className="bg-[#1b2c68a0] rounded-xl p-3 text-center border border-purple-500/10">
                                <p className={`text-lg font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                                  {metric.value}
                                </p>
                                <p className="text-gray-500 text-[10px] mt-1">{metric.label}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => onSelect(project)}
                            className={`flex-1 group/btn flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${gradient} rounded-xl text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300`}
                          >
                            <span>View Details</span>
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-3 bg-[#1b2c68a0] rounded-xl text-gray-300 hover:text-white hover:bg-[#1b2c68] transition-all duration-300 flex items-center justify-center"
                            >
                              <Github size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Floating Particle */}
                      <span
                        className={`anim-particle absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${gradient} rounded-full`}
                        style={{ animationDelay: `${index * 0.3}s` }}
                      />
                    </div>
                  </motion.div>
  );
});

const CompactProjectCard = memo(function CompactProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const ProjectIcon = getProjectIcon(project);
  const gradient = getProjectGradient(index + 4);

  return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative"
                  >
                    {/* Glow */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                    {/* Card */}
                    <div className="relative h-full bg-[#0a0d37] border border-[#1b2c68a0] rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <ProjectIcon size={24} className="text-white" />
                      </motion.div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack - Compact */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400 text-[10px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-500/10 border border-gray-500/20 rounded text-gray-400 text-[10px]">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => onSelect(project)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
  );
});
