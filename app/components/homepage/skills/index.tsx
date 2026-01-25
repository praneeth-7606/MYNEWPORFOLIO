'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skillsData from '@/data/skills.json';
import { Skill, SkillCategory } from '@/data/types';
import { Code2, Database, Brain, Cloud, Wrench, Palette, Server, Sparkles } from 'lucide-react';

const categories: { id: SkillCategory | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All Skills', icon: Sparkles },
  { id: 'frontend', label: 'Frontend', icon: Palette },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'ai-ml', label: 'AI/ML', icon: Brain },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'devops', label: 'DevOps', icon: Cloud },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((skill: Skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
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
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <Code2 className="relative text-cyan-400" size={80} strokeWidth={1.5} />
            </div>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Mastering modern technologies to build exceptional digital experiences
          </p>
        </motion.div>

        {/* Category Pills with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, type: "spring" }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'text-white shadow-2xl'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 opacity-100'
                    : 'bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100'
                }`} />
                
                {/* Glow effect */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 blur-xl opacity-60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon size={20} className={selectedCategory === category.id ? 'animate-pulse' : ''} />
                  {category.label}
                </span>

                {/* Particle effect on active */}
                {selectedCategory === category.id && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid - Extraordinary Design */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20"
          >
            {filteredSkills.map((skill: Skill, index: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group relative"
              >
                {/* Card Container */}
                <motion.div
                  whileHover={{ y: -8, rotateY: 5 }}
                  className="relative h-full p-6 rounded-3xl bg-gradient-to-br from-dark-card/90 to-dark-card/50 backdrop-blur-xl border border-teal-500/20 hover:border-cyan-500/60 transition-all duration-500 overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:via-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />
                  
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%)',
                    }}
                  />

                  {/* Animated corner accents */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    {/* Icon with 3D effect */}
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative text-6xl filter drop-shadow-lg">
                        {skill.icon}
                      </div>
                    </motion.div>
                    
                    {/* Name with gradient on hover */}
                    <h3 className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {skill.name}
                    </h3>
                    
                    {/* Animated proficiency bar */}
                    <div className="w-full space-y-2">
                      <div className="relative h-2 bg-dark-bg/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.05, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full relative"
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: index * 0.1
                            }}
                          />
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-semibold">{skill.proficiency}%</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          className="text-xs text-cyan-400 font-bold"
                        >
                          {skill.proficiency >= 90 ? '🔥' : skill.proficiency >= 75 ? '⭐' : '✨'}
                        </motion.span>
                      </div>
                    </div>
                  </div>

                  {/* Hover tooltip with 3D effect */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-30 px-5 py-3 bg-gradient-to-r from-dark-card to-dark-card/95 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 backdrop-blur-xl whitespace-nowrap"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="text-xs text-cyan-400 font-bold">
                              {skill.yearsOfExperience} years experience
                            </p>
                            <p className="text-xs text-emerald-400 font-bold">
                              {skill.projectsCompleted} projects completed
                            </p>
                          </div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-dark-card border-r border-b border-cyan-500/50" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Cards - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '🎯', value: `${skillsData.length}+`, label: 'Technologies', gradient: 'from-teal-500 to-cyan-500', delay: 0 },
            { icon: '⏱️', value: '4+', label: 'Years Experience', gradient: 'from-cyan-500 to-sky-500', delay: 0.1 },
            { icon: '🚀', value: '30+', label: 'Projects Completed', gradient: 'from-emerald-500 to-teal-500', delay: 0.2 },
            { icon: '⭐', value: '100%', label: 'Client Satisfaction', gradient: 'from-sky-500 to-cyan-500', delay: 0.3 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -8, rotateY: 5 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-dark-card/90 to-dark-card/50 backdrop-blur-xl border border-teal-500/20 hover:border-cyan-500/60 transition-all duration-500 overflow-hidden">
                {/* Animated gradient border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-[1px] rounded-3xl bg-dark-card" />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="text-5xl mb-3 filter drop-shadow-lg"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.p
                    className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: stat.delay + 0.2, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 font-semibold transition-colors">
                    {stat.label}
                  </p>
                </div>

                {/* Particle effects */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: stat.delay
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
