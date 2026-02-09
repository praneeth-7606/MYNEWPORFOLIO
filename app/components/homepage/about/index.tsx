'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import personalData from '@/data/personal.json';
import { Award, Briefcase, Code2, GraduationCap, Rocket, Sparkles, Target, Trophy } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { icon: Trophy, value: '1st Prize', label: 'Hackathon Winner', color: 'from-yellow-400 to-orange-500' },
    { icon: Code2, value: '200+', label: 'DSA Problems', color: 'from-blue-400 to-cyan-500' },
    { icon: Rocket, value: '8+', label: 'Production Projects', color: 'from-purple-400 to-pink-500' },
    { icon: GraduationCap, value: '8.3 GPA', label: 'Academic Excellence', color: 'from-green-400 to-emerald-500' },
  ];

  const expertise = [
    { 
      icon: Sparkles, 
      title: 'GenAI & LLM Integration', 
      description: 'Building production AI systems with RAG pipelines, multi-agent architectures, and semantic retrieval',
      skills: ['LangChain', 'Mistral AI', 'RAG', 'OCR', 'NLP']
    },
    { 
      icon: Code2, 
      title: 'Full-Stack Development', 
      description: 'Architecting scalable web applications with modern frameworks and cloud-native solutions',
      skills: ['React.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'AWS']
    },
    { 
      icon: Target, 
      title: 'Healthcare & Finance AI', 
      description: 'Specialized in building AI-driven solutions for healthcare automation and financial analysis',
      skills: ['Medical AI', 'OCR Systems', 'Data Processing', 'Compliance']
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
              Get To Know Me
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI Full-Stack Engineer crafting intelligent systems for real-world impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                
                <div className="relative bg-[#0a0d37] border border-[#1b2c68a0] rounded-2xl p-6 space-y-6">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20" />
                    <Image
                      src={personalData.profile}
                      alt={personalData.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white">{personalData.name}</h3>
                    <p className="text-cyan-400 font-medium">{personalData.title}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Briefcase size={16} />
                      <span>Value Health Inc</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-[#1b2c68a0] rounded-xl p-3 text-center hover:bg-[#1b2c68] transition-colors"
                      >
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} mb-2`}>
                          <stat.icon size={16} className="text-white" />
                        </div>
                        <p className="text-white font-bold text-sm">{stat.value}</p>
                        <p className="text-gray-400 text-xs">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{personalData.education.degree}</p>
                        <p className="text-gray-400 text-xs mt-1">{personalData.education.university}</p>
                        <p className="text-cyan-400 text-xs mt-1">GPA: {personalData.education.gpa}/10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="bg-[#0a0d37] border border-[#1b2c68a0] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Profile Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {personalData.bio}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-6">Core Expertise</h3>
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0a0d37] border border-[#1b2c68a0] rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-cyan-400" size={24} />
                <h3 className="text-2xl font-bold text-white">Key Achievements</h3>
              </div>
              <div className="space-y-3">
                {personalData.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-cyan-400 text-xl flex-shrink-0">✓</span>
                    <span className="text-lg">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
