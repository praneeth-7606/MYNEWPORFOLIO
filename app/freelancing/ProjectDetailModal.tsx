'use client';

import { motion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiX,
  FiAward,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiCpu,
} from 'react-icons/fi';
import { FreelancingProject } from './types';

/**
 * Nearly 200 lines of JSX and a dozen icons that only matter once a visitor opens
 * a project, so the page loads it on demand instead of shipping it up front.
 */
export default function ProjectDetailModal({
  project,
  onClose,
}: {
  project: FreelancingProject;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
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
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                {project.category}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                {project.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
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
              <p className="text-white font-bold text-xl">{project.duration}</p>
            </div>

            <div className="bg-[#1b2c68a0] p-6 rounded-2xl border-2 border-[#1b2c68]">
              <div className="flex items-center gap-3 text-purple-500 mb-3">
                <FiCalendar size={24} />
                <p className="font-bold text-lg">Completed</p>
              </div>
              <p className="text-white font-bold text-xl">
                {new Date(project.completedDate).toLocaleDateString('en-US', {
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
              <p className="text-white font-bold text-xl">{project.status}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
              <FiCode className="text-pink-500" size={28} />
              Project Overview
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
              <FiCpu className="text-violet-500" size={28} />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
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
              {project.features.map((feature, idx) => (
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
              {project.technicalHighlights.map((highlight, idx) => (
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
              {Object.entries(project.metrics).map(([key, value]) => (
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
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
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

            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
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
  );
}
