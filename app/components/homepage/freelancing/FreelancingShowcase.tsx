'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiX,
  FiCode,
  FiUsers,
  FiClock,
  FiStar
} from 'react-icons/fi';
import Image from 'next/image';
import freelancingData from '@/data/freelancing-work.json';

interface FreelancingProject {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  technicalHighlights?: string[];
  duration: string;
  completedDate: string;
  status: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  metrics: {
    [key: string]: string | undefined;
  };
}

export default function FreelancingShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<FreelancingProject | null>(null);

  const categories = ['All', ...new Set(freelancingData.map(p => p.category))];

  const filteredProjects = selectedCategory === 'All'
    ? freelancingData
    : freelancingData.filter(p => p.category === selectedCategory);

  return (
    <section id="freelancing" className="relative z-50 my-12 lg:my-24 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <p className="text-base sm:text-lg md:text-xl text-[#16f2b3] font-medium uppercase tracking-wider">
              Freelancing Portfolio
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Client Projects & Success Stories
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Delivering exceptional solutions for clients worldwide. From startups to established businesses.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white shadow-lg shadow-pink-500/50'
              : 'bg-[#1b2c68a0] text-gray-300 hover:bg-[#1b2c68] border border-[#1b2c68]'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-[#0d1224] to-[#0a0e1a] border-2 border-[#1b2c68a0] rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20"
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-[#0d1224]/50 to-transparent opacity-80"></div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-2 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg">
                  <FiCheckCircle size={14} />
                  {project.status}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                <FiUsers size={16} className="text-pink-500" />
                {project.type}
              </p>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#1b2c68] text-[#16f2b3] text-xs rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-3 py-1 bg-[#1b2c68] text-gray-400 text-xs rounded-lg font-medium">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-[#1b2c68]">
                {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-xs text-gray-400 capitalize">{key}</p>
                    <p className="text-sm font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiAward size={18} />
                  View Details
                </motion.button>

                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1b2c68] text-white rounded-xl hover:bg-[#1b2c68]/80 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink size={20} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-[#0d1224] to-[#0a0e1a] border-2 border-[#1b2c68] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 p-6 rounded-t-3xl flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90 flex items-center gap-2">
                    <FiUsers size={18} />
                    {selectedProject.type}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Project Image */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#1b2c68a0] p-4 rounded-xl border border-[#1b2c68]">
                    <div className="flex items-center gap-2 text-pink-500 mb-2">
                      <FiClock size={20} />
                      <p className="font-semibold">Duration</p>
                    </div>
                    <p className="text-white font-bold">{selectedProject.duration}</p>
                  </div>

                  <div className="bg-[#1b2c68a0] p-4 rounded-xl border border-[#1b2c68]">
                    <div className="flex items-center gap-2 text-purple-500 mb-2">
                      <FiCalendar size={20} />
                      <p className="font-semibold">Completed</p>
                    </div>
                    <p className="text-white font-bold">
                      {new Date(selectedProject.completedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="bg-[#1b2c68a0] p-4 rounded-xl border border-[#1b2c68]">
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                      <FiCheckCircle size={20} />
                      <p className="font-semibold">Status</p>
                    </div>
                    <p className="text-white font-bold">{selectedProject.status}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FiCode className="text-pink-500" />
                    Project Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-[#1b2c68] to-[#162454] text-[#16f2b3] rounded-lg font-semibold border border-[#1b2c68] shadow-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-[#1b2c68a0] p-4 rounded-xl border border-[#1b2c68]"
                      >
                        <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <FiTrendingUp className="text-pink-500" />
                    Project Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-br from-[#1b2c68] to-[#162454] p-6 rounded-xl border-2 border-[#1b2c68] text-center"
                      >
                        <p className="text-gray-400 text-sm capitalize mb-2">{key}</p>
                        <p className="text-2xl font-bold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {selectedProject.testimonial && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <FiStar className="text-yellow-500" />
                      Client Testimonial
                    </h3>
                    <div className="bg-gradient-to-br from-[#1b2c68] to-[#162454] p-6 rounded-2xl border-2 border-[#1b2c68] relative">
                      <div className="text-6xl text-pink-500/20 absolute top-4 left-4">&quot;</div>
                      <p className="text-gray-300 italic mb-4 relative z-10 pl-8">
                        {selectedProject.testimonial.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl">
                          {selectedProject.testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold">{selectedProject.testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{selectedProject.testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink size={22} />
                      View Live Project
                    </motion.a>
                  )}

                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1b2c68] text-white py-4 rounded-xl font-bold hover:bg-[#1b2c68]/80 transition-all flex items-center justify-center gap-2 text-lg border-2 border-[#1b2c68]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub size={22} />
                      View Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
