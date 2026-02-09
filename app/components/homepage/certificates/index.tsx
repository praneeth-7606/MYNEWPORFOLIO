'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, Building2, Trophy, Users, Zap, Star, Sparkles } from 'lucide-react';
import certificationsData from '@/data/certifications.json';

export default function Certificates() {
  // Separate hackathons from other certifications
  const hackathons = certificationsData.filter(cert => cert.achievement);
  const otherCerts = certificationsData.filter(cert => !cert.achievement);

  return (
    <section id="certificates" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />
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
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium">
              Achievements & Learning
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hackathon victories and professional certifications showcasing continuous growth
          </p>
        </motion.div>

        {/* Hackathon Wins - Featured Section */}
        {hackathons.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Trophy className="text-yellow-400" size={32} />
              <h3 className="text-3xl font-bold text-white">Hackathon Victories</h3>
              <Sparkles className="text-yellow-400 animate-pulse" size={24} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {hackathons.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative"
                >
                  {/* Mega Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 animate-pulse transition-opacity duration-500" />
                  
                  {/* Card */}
                  <div className="relative h-full bg-gradient-to-br from-[#0a0d37] to-[#1a1f4a] rounded-3xl p-8 border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500" />
                    </div>

                    {/* Winner Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50"
                      >
                        <Trophy size={32} className="text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl filter drop-shadow-2xl"
                      >
                        {cert.icon}
                      </motion.div>

                      {/* Title */}
                      <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                        {cert.title}
                      </h4>

                      {/* Achievement Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-yellow-400 font-bold text-sm">{cert.achievement}</span>
                      </div>

                      {/* Issuer */}
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building2 size={18} className="text-yellow-400" />
                        <span className="text-sm font-medium">{cert.issuer}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={18} className="text-orange-400" />
                        <span className="text-sm">{cert.date}</span>
                      </div>

                      {/* Description */}
                      {cert.description && (
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {cert.description}
                        </p>
                      )}

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {cert.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Floating Particles */}
                    <motion.div
                      className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-400 rounded-full"
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
          </div>
        )}

        {/* Other Certifications */}
        {otherCerts.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Award className="text-cyan-400" size={28} />
              <h3 className="text-2xl font-bold text-white">Professional Certifications</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${cert.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className="relative h-full bg-[#0a0d37] border border-[#1b2c68a0] rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl mb-4 filter drop-shadow-lg"
                    >
                      {cert.icon}
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h4>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Building2 size={14} className="text-cyan-400 flex-shrink-0" />
                      <span className="text-xs truncate">{cert.issuer}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <Calendar size={14} className="text-cyan-400 flex-shrink-0" />
                      <span className="text-xs">{cert.date}</span>
                    </div>

                    {/* Skills - Compact */}
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] font-medium rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-gray-500/10 border border-gray-500/20 text-gray-400">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Trophy, value: '2', label: 'Hackathon Wins', gradient: 'from-yellow-400 to-orange-500', color: 'text-yellow-400' },
            { icon: Award, value: `${certificationsData.length}`, label: 'Total Certifications', gradient: 'from-cyan-500 to-teal-500', color: 'text-cyan-400' },
            { icon: Users, value: '30+', label: 'Teams Competed', gradient: 'from-purple-500 to-pink-500', color: 'text-purple-400' },
            { icon: Zap, value: '200+', label: 'DSA Problems', gradient: 'from-orange-500 to-red-500', color: 'text-orange-400' },
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
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              
              <div className="relative p-6 rounded-2xl bg-[#0a0d37] border border-[#1b2c68a0] hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-center space-y-2">
                  <stat.icon className={`${stat.color} mx-auto mb-2`} size={32} />
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 font-semibold">
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
