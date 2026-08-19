'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Database,
  Brain,
  FileText,
  Award,
  TrendingUp,
  Code,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Project } from '@/data/types';

// Icon lookup, mirrored from the section so this chunk stands alone.
const getProjectIcon = (project: Project) => {
  if (project.id === 'ebv-system') return Database;
  if (project.id === 'bank-statement-analyzer') return TrendingUp;
  if (project.id === 'scribex-medical') return FileText;
  if (project.id === 'resume-automation') return Award;
  if (project.category.includes('genai')) return Brain;
  return Code;
};

// Lives in its own chunk: ~200 lines of JSX plus its icon set only matter once
// a visitor actually opens a project, so it is loaded on demand rather than
// shipped with the section itself.
export default function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ProjectIcon = getProjectIcon(project);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#0a0d37] to-[#1a1f4a] border-2 border-purple-500/30 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0a0d37] to-[#1a1f4a] border-b border-purple-500/20 p-8 flex items-start justify-between z-10 backdrop-blur-xl">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <ProjectIcon size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2">
                {project.award && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
                    <Award size={12} />
                    {project.award}
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h4 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <Sparkles size={20} />
              Overview
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Code size={20} />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white rounded-xl text-sm font-medium hover:scale-105 transition-transform"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Zap size={20} />
              Key Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#1b2c68a0] rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                  <span className="text-purple-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Pipeline */}
          {project.aiPipeline && (
            <div>
              <h4 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <Brain size={20} />
                AI Architecture
              </h4>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-semibold min-w-[140px]">LLM Provider:</span>
                  <span className="text-white font-medium">{project.aiPipeline.llmProvider}</span>
                </div>
                {project.aiPipeline.vectorDb && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-semibold min-w-[140px]">Vector Database:</span>
                    <span className="text-white font-medium">{project.aiPipeline.vectorDb}</span>
                  </div>
                )}
                {project.aiPipeline.framework && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-semibold min-w-[140px]">Framework:</span>
                    <span className="text-white font-medium">{project.aiPipeline.framework}</span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-semibold min-w-[140px]">APIs:</span>
                  <span className="text-white font-medium">{project.aiPipeline.apis.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Results & Metrics
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform">
                    <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-purple-500/20">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl text-white font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>View Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-[#1b2c68a0] border border-purple-500/30 rounded-2xl text-white font-bold hover:bg-[#1b2c68] hover:border-purple-500/50 transition-all duration-300"
              >
                <Github size={20} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
