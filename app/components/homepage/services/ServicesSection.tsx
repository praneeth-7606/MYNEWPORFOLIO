'use client';

import { motion } from 'framer-motion';
import servicesData from '@/data/services.json';
import { Service } from '@/data/types';
import { Code, Brain, Server, Layout, Lightbulb, Clock, DollarSign } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  code: Code,
  brain: Brain,
  server: Server,
  layout: Layout,
  lightbulb: Lightbulb,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32">
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
              Services I Offer
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive development solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: Service, index: number) => {
            const Icon = iconMap[service.icon] || Code;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#0a0d37] border border-[#1b2c68a0] rounded-xl p-6 hover:border-[#16f2b3] transition-all duration-300 hover:shadow-xl hover:shadow-[#16f2b3]/20"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#16f2b3] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#16f2b3] mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing & Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1b2c68a0]">
                  {service.startingPrice && (
                    <div className="flex items-center gap-2 text-[#16f2b3]">
                      <DollarSign size={16} />
                      <span className="font-semibold">{service.startingPrice}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock size={16} />
                    <span>{service.estimatedDuration}</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#1b2c68a0] text-xs text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-[#1b2c68a0] text-xs text-gray-300 rounded">
                      +{service.techStack.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <span>Let&apos;s Work Together</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
