'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Star, Calendar, MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { educations } from '@/utils/data/educations';
import { useInViewportFlag } from '@/app/components/helper/use-in-viewport';

const bottomStats = [
  { icon: <GraduationCap size={32} />, value: '8.4', label: 'CGPA', color: 'from-orange-500 to-amber-500' },
  { icon: <BookOpen size={32} />, value: '3', label: 'Degrees', color: 'from-amber-500 to-yellow-500' },
  { icon: <Award size={32} />, value: '10+', label: 'Certifications', color: 'from-yellow-500 to-orange-500' },
  { icon: <Sparkles size={32} />, value: 'AI', label: 'Specialization', color: 'from-rose-500 to-pink-500' },
];

export default function Education() {
  // Parks this section's decorative CSS animations while it is off-screen.
  const sectionRef = useInViewportFlag<HTMLElement>();

  return (
    <section ref={sectionRef} id="education" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background. These were framer-motion loops rotating a 384px
          blur(64px) layer, which forces the browser to re-rasterize the blur on
          every frame; the rotation of a radial blur is invisible anyway, so only
          the scale pulse survives and it now runs on the compositor. */}
      <div className="absolute inset-0">
        <div className="anim-blob absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl" />
        <div className="anim-blob-slow absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="anim-blob-slow absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full blur-3xl opacity-50" />
              <GraduationCap className="relative text-amber-400" size={90} strokeWidth={1.5} />
            </div>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Building a strong foundation through continuous learning
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Main Featured Card - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="h-full relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Main Card */}
              <div className="relative h-full bg-gradient-to-br from-dark-card via-dark-card to-dark-card/90 border border-white/10 rounded-3xl overflow-hidden p-8 md:p-12">
                {/* Top Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
                
                {/* Floating Icon */}
                <div className="anim-float-bob absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-3xl flex items-center justify-center border border-white/10">
                  <GraduationCap className="text-amber-400" size={48} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm mb-6"
                  >
                    <Star size={16} />
                    <span>Current</span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight max-w-lg">
                    {educations[0].title}
                  </h3>

                  {/* Institution */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                    <p className="text-xl text-gray-300 font-semibold">
                      {educations[0].institution}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3 mb-8">
                    <Calendar className="text-orange-400" size={20} />
                    <p className="text-lg text-gray-400 font-medium">
                      {educations[0].duration}
                    </p>
                  </div>

                  {/* CGPA Highlight */}
                  {educations[0].cgpa && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                    >
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500">
                        <Award className="text-white" size={32} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">
                          Academic Performance
                        </p>
                        <p className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                          {educations[0].cgpa}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-3xl" />
              </div>
            </motion.div>
          </motion.div>

          {/* Secondary Education Cards */}
          {educations.slice(1).map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                className="h-full relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-dark-card to-dark-card/80 border border-white/10 rounded-3xl overflow-hidden p-6">
                  {/* Top Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 mb-4"
                  >
                    <BookOpen className="text-rose-400" size={28} />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                    {edu.title}
                  </h4>

                  {/* Institution */}
                  <p className="text-sm text-gray-400 mb-3 font-medium">
                    {edu.institution}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={14} />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="h-full relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-dark-card to-dark-card/80 border border-white/10 rounded-3xl overflow-hidden p-6 flex flex-col items-center justify-center text-center">
                {/* Animated Icon */}
                <div className="anim-spin-slow w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="text-yellow-400" size={40} />
                </div>

                {/* Value */}
                <p className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  4+
                </p>

                {/* Label */}
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  Years of Learning
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {bottomStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-dark-card to-dark-card/80 border border-white/10 overflow-hidden">
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
      </div>
    </section>
  );
}
