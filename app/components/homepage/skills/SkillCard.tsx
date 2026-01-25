'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/data/types';
import { useState } from 'react';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

// Icon mapping for skills
const getSkillIcon = (iconName: string) => {
  const icons: { [key: string]: string } = {
    react: '⚛️',
    nextjs: '▲',
    typescript: '📘',
    javascript: '📜',
    html: '🌐',
    css: '🎨',
    tailwind: '💨',
    materialui: '🎭',
    bootstrap: '🅱️',
    nodejs: '🟢',
    express: '🚂',
    fastapi: '⚡',
    python: '🐍',
    mongodb: '🍃',
    mysql: '🐬',
    postgresql: '🐘',
    firebase: '🔥',
    ai: '🤖',
    langchain: '🔗',
    database: '💾',
    openai: '🧠',
    git: '📦',
    github: '🐙',
    vscode: '💻',
    postman: '📮',
    docker: '🐳',
    vercel: '▲',
    aws: '☁️',
  };
  return icons[iconName.toLowerCase()] || '💡';
};

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-[#0a0d37] border border-[#1b2c68a0] rounded-xl p-6 hover:border-[#16f2b3] transition-all duration-300 hover:shadow-xl hover:shadow-[#16f2b3]/20 cursor-pointer">
        {/* Icon */}
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {getSkillIcon(skill.icon)}
        </div>

        {/* Skill Name */}
        <h3 className="text-white font-semibold mb-2 group-hover:text-[#16f2b3] transition-colors">
          {skill.name}
        </h3>

        {/* Proficiency Bar */}
        <div className="relative h-2 bg-[#1b2c68a0] rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full"
          />
        </div>

        {/* Proficiency Percentage */}
        <p className="text-xs text-gray-400">{skill.proficiency}% Proficiency</p>

        {/* Hover Details */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            height: isHovered ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="mt-3 pt-3 border-t border-[#1b2c68a0] space-y-1 overflow-hidden"
        >
          <p className="text-xs text-gray-400">
            <span className="text-[#16f2b3]">Experience:</span> {skill.yearsOfExperience} years
          </p>
          {skill.projectCount && (
            <p className="text-xs text-gray-400">
              <span className="text-[#16f2b3]">Projects:</span> {skill.projectCount}+
            </p>
          )}
        </motion.div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-violet-600/20 to-[#16f2b3]/20 blur-xl rounded-xl" />
      </div>
    </motion.div>
  );
}
