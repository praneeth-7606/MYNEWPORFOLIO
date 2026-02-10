'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiExternalLink, 
  FiGithub, 
  FiCalendar, 
  FiCheckCircle, 
  FiCode,
  FiX,
  FiAward,
  FiTrendingUp,
  FiLayers,
  FiZap,
  FiTarget,
  FiCpu
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import freelancingWork from '@/data/freelancing-work.json';

interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  technicalHighlights: string[];
  duration: string;
  completedDate: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  metrics: {
    [key: string]: string;
  };
}

export default function FreelancingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', ...new Set(freelancingWork.map(p => p.category))];

  const filteredProjects = selectedCategory === 'All'
    ? freelancingWork
    : freelancingWork.filter(p => p.category === selectedCategory);

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
              {[
                { icon: FiCode, label: 'Projects Completed', value: freelancingWork.length },
                { icon: FiAward, label: 'Technologies', value: '15+' },
                { icon: FiZap, label: 'Live Deployments', value: freelancingWork.length },
                { icon: FiTarget, label: 'Success Rate', value: '100%' }
              ].map((stat, idx) => (
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
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 text-base ${
                  selectedCategory === category
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
              <motion.div
                key={project.id}
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
                      onClick={() => setSelectedProject(project)}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-[#0d1224] to-[#0a0e1a] border-2 border-[#1b2c68] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 p-8 rounded-t-3xl flex justify-between items-start shadow-xl">
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                      {selectedProject.category}
                    </span>
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                      {selectedProject.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:bg-white/20 p-3 rounded-xl transition-colors"
                >
                  <FiX size={28} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 sm:p-10">
                {/* Project Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-[#1b2c68a0] p-6 rounded-2xl border-2 border-[#1b2c68]">
                    <div className="flex items-center gap-3 text-pink-500 mb-3">
                      <FiCalendar size={24} />
                      <p className="font-bold text-lg">Duration</p>
                    </div>
                    <p className="text-white font-bold text-xl">{selectedProject.duration}</p>
                  </div>
                  
                  <div className="bg-[#1b2c68a0] p-6 rounded-2xl border-2 border-[#1b2c68]">
                    <div className="flex items-center gap-3 text-purple-500 mb-3">
                      <FiCalendar size={24} />
                      <p className="font-bold text-lg">Completed</p>
                    </div>
                    <p className="text-white font-bold text-xl">
                      {new Date(selectedProject.completedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div className="bg-[#1b2c68a0] p-6 rounded-2xl border-2 border-[#1b2c68]">
                    <div className="flex items-center gap-3 text-green-500 mb-3">
                      <FiCheckCircle size={24} />
                      <p className="font-bold text-lg">Status</p>
                    </div>
                    <p className="text-white font-bold text-xl">{selectedProject.status}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <FiCode className="text-pink-500" size={28} />
                    Project Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <FiCpu className="text-violet-500" size={28} />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-5 py-3 bg-gradient-to-r from-[#1b2c68] to-[#162454] text-[#16f2b3] rounded-xl font-bold border-2 border-[#1b2c68] shadow-lg text-base"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <FiZap className="text-yellow-500" size={28} />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 bg-[#1b2c68a0] p-5 rounded-xl border-2 border-[#1b2c68] hover:border-pink-500/50 transition-all"
                      >
                        <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <p className="text-gray-300 text-base">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <FiTarget className="text-pink-500" size={28} />
                    Technical Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.technicalHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 bg-gradient-to-br from-pink-500/10 to-violet-500/10 p-5 rounded-xl border-2 border-pink-500/30"
                      >
                        <FiAward className="text-pink-500 mt-1 flex-shrink-0" size={20} />
                        <p className="text-gray-300 text-base font-medium">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <FiTrendingUp className="text-green-500" size={28} />
                    Project Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-br from-[#1b2c68] to-[#162454] p-8 rounded-2xl border-2 border-[#1b2c68] text-center hover:border-pink-500/50 transition-all"
                      >
                        <p className="text-gray-400 text-base capitalize mb-3">{key}</p>
                        <p className="text-3xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-5">
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white py-5 rounded-xl font-bold hover:shadow-2xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-3 text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink size={24} />
                      View Live Project
                    </motion.a>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1b2c68] text-white py-5 rounded-xl font-bold hover:bg-[#1b2c68]/80 transition-all flex items-center justify-center gap-3 text-lg border-2 border-[#1b2c68] hover:border-pink-500/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub size={24} />
                      View Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
