'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import personalData from '@/data/personal.json';
import { Award, Code, Coffee, Heart } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    { icon: Code, label: '30+ Projects', description: 'Successfully delivered' },
    { icon: Award, label: '1st Prize', description: 'Internal Hackathon Winner' },
    { icon: Coffee, label: '4+ Years', description: 'Coding Experience' },
    { icon: Heart, label: '100%', description: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer turning ideas into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-dark-card border border-teal-500/20 rounded-2xl p-4 overflow-hidden">
                <Image
                  src={personalData.profile}
                  alt={personalData.name}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">
              Hi, I'm <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">{personalData.name}</span>
            </h3>
            
            <p className="text-gray-300 leading-relaxed">
              {personalData.bio}
            </p>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-white">What I Do:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Build scalable full-stack web applications with modern frameworks</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Integrate GenAI and LLM capabilities into existing systems</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Design and develop RESTful APIs and microservices</span>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span>Create intuitive and responsive user interfaces</span>
                </li>
              </ul>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-card border border-teal-500/20 rounded-xl p-4 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  <item.icon className="text-cyan-400 mb-2" size={24} />
                  <p className="text-white font-bold text-lg">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
