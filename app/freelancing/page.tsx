'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiCheckCircle,
  FiCode,
  FiAward,
  FiLayers,
  FiZap,
  FiTarget,
} from 'react-icons/fi';
import Link from 'next/link';
import freelancingWork from '@/data/freelancing-work.json';
import { FreelancingProject } from './types';

// Pulled out of the initial bundle: nothing renders it until a card is clicked.
const ProjectDetailModal = dynamic(() => import('./ProjectDetailModal'), { ssr: false });

const allProjects = freelancingWork as unknown as FreelancingProject[];

// Both derive from a static JSON import, so they are computed once at module load
// rather than on every render of the page.
const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))];

const heroStats = [
  { icon: FiCode, label: 'Projects Completed', value: allProjects.length },
  { icon: FiAward, label: 'Technologies', value: '15+' },
  { icon: FiZap, label: 'Live Deployments', value: allProjects.length },
  { icon: FiTarget, label: 'Success Rate', value: '100%' },
];

export default function FreelancingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<FreelancingProject | null>(null);

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? allProjects
        : allProjects.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  // Stable identities, so the memoized cards below actually stay memoized.
  const handleSelectProject = useCallback((project: FreelancingProject) => setSelectedProject(project), []);
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1224] via-[#0a0e1a] to-[#0d1224]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 rounded-full text-pink-400 font-semibold text-sm sm:text-base backdrop-blur-sm">
                🚀 Freelancing Portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">Exceptional</span>
              <br />Digital Experiences
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Showcasing my journey in full-stack development, AI/ML integration, and modern web applications.
              Each project represents a commitment to quality, innovation, and user-centric design.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="bg-gradient-to-br from-[#1b2c68] to-[#162454] p-6 rounded-2xl border-2 border-[#1b2c68] hover:border-pink-500/50 transition-all"
                >
                  <stat.icon className="text-pink-500 text-3xl mb-3 mx-auto" />
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 text-base ${selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white shadow-xl shadow-pink-500/50 scale-105'
                  : 'bg-[#1b2c68a0] text-gray-300 hover:bg-[#1b2c68] border-2 border-[#1b2c68] hover:border-pink-500/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <FreelancingProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleSelectProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#1b2c68] to-[#162454] text-white rounded-xl font-bold hover:from-pink-500/20 hover:to-violet-500/20 transition-all border-2 border-[#1b2c68] hover:border-pink-500/50 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Extracted and memoized: picking a category or opening the detail modal
// re-renders the page, and without this every card's framer-motion subtree was
// rebuilt each time even though none of their props had changed.
const FreelancingProjectCard = memo(function FreelancingProjectCard({
  project,
  index,
  onSelect,
}: {
  project: FreelancingProject;
  index: number;
  onSelect: (project: FreelancingProject) => void;
}) {
  const handleSelect = useCallback(() => onSelect(project), [onSelect, project]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#0d1224] to-[#0a0e1a] border-2 border-[#1b2c68a0] rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 shadow-2xl hover:shadow-pink-500/20"
    >
      {/* Project Image */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-pink-500/10 to-violet-500/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <FiCode className="text-9xl text-pink-500/20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-[#0d1224]/50 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-6 right-6">
          <span className="px-5 py-2.5 bg-green-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-xl">
            <FiCheckCircle size={16} />
            {project.status}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-5 py-2.5 bg-purple-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-xl">
            {project.type}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-8">
        <div className="mb-4">
          <span className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 rounded-lg text-pink-400 text-sm font-semibold">
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-500 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-[#1b2c68] text-[#16f2b3] text-sm rounded-lg font-semibold border border-[#1b2c68]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-4 py-2 bg-[#1b2c68] text-gray-400 text-sm rounded-lg font-semibold">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t-2 border-[#1b2c68]">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-xs text-gray-400 capitalize mb-1">{key}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={handleSelect}
            className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiLayers size={20} />
            View Details
          </motion.button>

          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-[#1b2c68] text-white rounded-xl hover:bg-[#1b2c68]/80 transition-all border-2 border-[#1b2c68] hover:border-pink-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink size={24} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
});
