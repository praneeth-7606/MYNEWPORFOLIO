'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, Building2, CheckCircle2, ExternalLink } from 'lucide-react';
import certificationsData from '@/data/certifications.json';

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
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
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <Award className="relative text-amber-400" size={80} strokeWidth={1.5} />
            </div>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Professional certifications and continuous skill development
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-dark-card/90 to-dark-card/50 backdrop-blur-xl border border-amber-500/20 hover:border-orange-500/60 transition-all duration-500 overflow-hidden">
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-all duration-500`} />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${cert.color} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Corner ribbon */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                  <div className={`absolute top-4 right-[-32px] w-32 h-8 bg-gradient-to-r ${cert.color} transform rotate-45 flex items-center justify-center shadow-lg`}>
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl filter drop-shadow-lg"
                  >
                    {cert.icon}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300 min-h-[3.5rem]">
                    {cert.title}
                  </h3>
                  
                  {/* Issuer */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building2 size={18} className="text-amber-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{cert.issuer}</span>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={18} className="text-orange-400 flex-shrink-0" />
                    <span className="text-sm">{cert.date}</span>
                  </div>
                  
                  {/* Credential ID */}
                  <div className="pt-4 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500 mb-1">Credential ID</p>
                    <p className="text-sm font-mono text-gray-400">{cert.credentialId}</p>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cert.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${cert.color} bg-opacity-20 text-white border border-amber-500/30`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Particle effects */}
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '🏆', value: `${certificationsData.length}+`, label: 'Certifications', gradient: 'from-amber-500 to-orange-500' },
            { icon: '📚', value: '10+', label: 'Courses Completed', gradient: 'from-orange-500 to-red-500' },
            { icon: '⭐', value: '100%', label: 'Completion Rate', gradient: 'from-yellow-500 to-amber-500' },
            { icon: '🎯', value: 'Active', label: 'Learning Status', gradient: 'from-red-500 to-orange-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-dark-card/90 to-dark-card/50 backdrop-blur-xl border border-amber-500/20 hover:border-orange-500/60 transition-all duration-500 overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-2">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="text-4xl mb-2 filter drop-shadow-lg"
                  >
                    {stat.icon}
                  </motion.div>
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 font-semibold transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
