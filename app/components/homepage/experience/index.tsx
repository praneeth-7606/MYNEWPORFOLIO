'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import experienceData from '@/data/experience.json';
import { Experience } from '@/data/types';
import { Briefcase, Calendar, Trophy, Code2, MapPin, TrendingUp, Target, Rocket } from 'lucide-react';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fulltime': return 'from-green-500 to-emerald-500';
      case 'internship': return 'from-blue-500 to-cyan-500';
      case 'freelance': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fulltime': return '💼';
      case 'internship': return '🎓';
      case 'freelance': return '🚀';
      default: return '💻';
    }
  };

  return (
    <section ref={containerRef} id="experience" className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-bg/95 to-dark-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full blur-3xl opacity-50"
              />
              <Briefcase className="relative text-violet-400" size={90} strokeWidth={1.5} />
            </div>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Transforming ideas into reality through innovation and dedication
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 hidden lg:block" />

          {/* Experience Cards */}
          <div className="space-y-16 lg:space-y-24">
            {(experienceData as Experience[]).map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, rotateY: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.5, rotate: 360 }}
                      className="relative"
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} blur-md`}
                      />
                      
                      {/* Main dot */}
                      <div className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} border-4 border-dark-bg shadow-2xl flex items-center justify-center`}>
                        <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Card Container */}
                  <div className={`w-full lg:w-[calc(50%-4rem)] ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group relative"
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(exp.type)} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                      
                      {/* Main Card */}
                      <div className="relative bg-gradient-to-br from-dark-card/90 to-dark-card/50 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-3xl overflow-hidden transition-all duration-500">
                        {/* Top Gradient Bar */}
                        <div className={`h-2 bg-gradient-to-r ${getTypeColor(exp.type)}`} />
                        
                        {/* Card Content */}
                        <div className="p-8">
                          {/* Header */}
                          <div className="mb-6">
                            {/* Type Badge */}
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3, type: "spring" }}
                              className="inline-flex items-center gap-2 mb-4"
                            >
                              <span className="text-3xl">{getTypeIcon(exp.type)}</span>
                              <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${getTypeColor(exp.type)} text-white shadow-lg`}>
                                {exp.type === 'fulltime' ? 'Full-Time' :
                                 exp.type === 'internship' ? 'Internship' : 'Freelance'}
                              </span>
                            </motion.div>
                            
                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300">
                              {exp.title}
                            </h3>
                            
                            {/* Company */}
                            <p className={`text-lg md:text-xl font-bold bg-gradient-to-r ${getTypeColor(exp.type)} bg-clip-text text-transparent mb-3`}>
                              {exp.company}
                            </p>
                            
                            {/* Duration & Location */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-violet-400" />
                                <span>{exp.duration}</span>
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin size={16} className="text-fuchsia-400" />
                                  <span>{exp.location}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Trophy className="text-yellow-400" size={20} />
                              <h4 className="text-lg font-bold text-white">Key Achievements</h4>
                            </div>
                            <div className="space-y-3">
                              {exp.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.4 + idx * 0.1 }}
                                  className="flex items-start gap-3 group/item"
                                >
                                  <motion.div 
                                    whileHover={{ scale: 1.5, rotate: 180 }}
                                    className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} flex-shrink-0`} 
                                  />
                                  <p className="text-gray-300 text-sm group-hover/item:text-white transition-colors">
                                    {achievement}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Code2 className="text-cyan-400" size={20} />
                              <h4 className="text-lg font-bold text-white">Tech Stack</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, idx) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.5 + idx * 0.05 }}
                                  whileHover={{ scale: 1.15, y: -3 }}
                                  className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} bg-opacity-20 border border-white/20 text-white font-semibold text-xs backdrop-blur-sm hover:border-white/40 transition-all cursor-default`}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl" />
                        
                        {/* Particle effect */}
                        <motion.div
                          className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)}`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
        >
          {[
            { icon: <Target size={32} />, value: `${experienceData.length}`, label: 'Roles', color: 'from-violet-500 to-purple-500' },
            { icon: <Trophy size={32} />, value: '15+', label: 'Achievements', color: 'from-purple-500 to-fuchsia-500' },
            { icon: <Rocket size={32} />, value: '25+', label: 'Projects', color: 'from-fuchsia-500 to-pink-500' },
            { icon: <TrendingUp size={32} />, value: '100%', label: 'Success', color: 'from-pink-500 to-rose-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-dark-card/80 to-dark-card/40 backdrop-blur-xl border border-white/10 group-hover:border-white/30 overflow-hidden transition-all duration-500">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-3">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-20 text-white mb-2`}
                  >
                    {stat.icon}
                  </motion.div>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
