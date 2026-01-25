'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/types';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { forwardRef } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, onClick }, ref) => {
  const isGenAI = project.category.includes('genai');

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative bg-[#0a0d37] border border-[#1b2c68a0] rounded-xl overflow-hidden cursor-pointer hover:border-[#16f2b3] transition-all duration-300 hover:shadow-xl hover:shadow-[#16f2b3]/20"
    >
      {/* GenAI Badge */}
      {isGenAI && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-xs font-semibold text-white">
          <Sparkles size={12} />
          <span>GenAI</span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#1b2c68a0] to-[#0a0d37] overflow-hidden">
        {project.images && project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl text-[#16f2b3]/20">
              {project.category.includes('genai') ? '🤖' : '💻'}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d37] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-[#16f2b3] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[#1b2c68a0] text-xs text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-[#1b2c68a0] text-xs text-gray-300 rounded">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex items-center gap-4 pt-2 border-t border-[#1b2c68a0]">
            {project.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="text-center">
                <p className="text-sm font-bold text-[#16f2b3]">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg transition-all"
          >
            View Details
          </button>
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-[#1b2c68a0] rounded-lg text-gray-300 hover:text-[#16f2b3] hover:bg-[#1b2c68] transition-all"
                  aria-label="View live demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-[#1b2c68a0] rounded-lg text-gray-300 hover:text-[#16f2b3] hover:bg-[#1b2c68] transition-all"
                  aria-label="View source code"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-violet-600/10 to-[#16f2b3]/10" />
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
